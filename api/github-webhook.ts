import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Verify HMAC-SHA256 signature from GitHub
function verifyGitHubSignature(secret: string, signature: string | undefined, payload: string): boolean {
  if (!signature || !signature.startsWith('sha256=')) return false;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

// Read raw body from incoming stream
async function getRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  const signature = req.headers['x-hub-signature-256'] as string | undefined;
  const event = req.headers['x-github-event'] as string | undefined;
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  const rawBody = await getRawBody(req);

  // Security Check: If secret is defined, verify HMAC
  if (secret) {
    if (!verifyGitHubSignature(secret, signature, rawBody)) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Invalid HMAC signature' }));
    }
  }

  // Handle GitHub Ping
  if (event === 'ping') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ message: 'Pong! Webhook connected successfully.' }));
  }

  // Handle GitHub Push
  if (event === 'push') {
    try {
      const payload = JSON.parse(rawBody);
      const repoFullName = payload.repository?.full_name;
      const headCommit = payload.head_commit || payload.commits?.[payload.commits?.length - 1];

      if (!headCommit) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ message: 'No commits detected in push' }));
      }

      const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://wtehlnkctmtdcstukgpq.supabase.co';
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!serviceRoleKey) {
        console.warn('SUPABASE_SERVICE_ROLE_KEY not configured in environment');
      }

      const supabase = createClient(supabaseUrl, serviceRoleKey || process.env.VITE_SUPABASE_ANON_KEY || '');

      const commitData = {
        last_commit_message: headCommit.message,
        last_commit_at: headCommit.timestamp,
        last_commit_url: headCommit.url,
        last_commit_author: headCommit.author?.name || headCommit.author?.username || 'Developer',
        last_commit_sha: headCommit.id?.slice(0, 7) || headCommit.id,
        updated_at: new Date().toISOString(),
      };

      // Update matching project by repository name
      const { data: updatedProjects, error: updateError } = await supabase
        .from('projects')
        .update(commitData)
        .or(`github_repo_name.ilike.${repoFullName},github_url.ilike.%${repoFullName}%`)
        .select('id, title, slug');

      if (updateError) {
        console.error('Failed to update project in database:', updateError);
      }

      // Record activity log
      await supabase.from('github_activity_logs').insert({
        event_type: 'push',
        repo_name: repoFullName,
        commit_message: headCommit.message,
        commit_url: headCommit.url,
        commit_author: headCommit.author?.name,
        commit_sha: headCommit.id?.slice(0, 7),
        raw_payload: payload,
      });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(
        JSON.stringify({
          success: true,
          message: `Recorded commit for ${repoFullName}`,
          matched_projects: updatedProjects?.length || 0,
        })
      );
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({ message: `Ignored event: ${event}` }));
}
