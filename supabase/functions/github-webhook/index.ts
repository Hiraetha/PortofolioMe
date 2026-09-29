// Supabase Edge Function: github-webhook
// Follows Method 2: GitHub Webhooks + Supabase Realtime Database
// Runtime: Deno

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-hub-signature-256, x-github-event",
};

// HMAC-SHA256 signature verification
async function verifySignature(secret: string, signature: string, payload: string): Promise<boolean> {
  if (!signature.startsWith("sha256=")) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const sigHex = signature.slice(7);
  const sigBytes = new Uint8Array(
    sigHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  return await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    encoder.encode(payload)
  );
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("x-hub-signature-256");
    const event = req.headers.get("x-github-event");
    const webhookSecret = Deno.env.get("GITHUB_WEBHOOK_SECRET");

    if (!webhookSecret) {
      console.error("Missing GITHUB_WEBHOOK_SECRET in Supabase environment secrets");
      return new Response(JSON.stringify({ error: "Server misconfiguration: secret not set" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rawBody = await req.text();

    // 1. Verify HMAC Signature for maximum security
    if (signature) {
      const isValid = await verifySignature(webhookSecret, signature, rawBody);
      if (!isValid) {
        console.warn("Invalid signature received from webhook request");
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      console.warn("No signature provided in x-hub-signature-256 header");
      return new Response(JSON.stringify({ error: "Missing signature header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = JSON.parse(rawBody);

    // 2. Initialize Supabase Admin Client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 3. Handle GitHub "ping" event (when setting up webhook in GitHub)
    if (event === "ping") {
      return new Response(JSON.stringify({ message: "Pong! GitHub Webhook connected successfully." }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4. Handle GitHub "push" event
    if (event === "push") {
      const repoFullName = payload.repository?.full_name; // e.g. "username/project-repo"
      const repoHtmlUrl = payload.repository?.html_url;   // e.g. "https://github.com/username/project-repo"
      const headCommit = payload.head_commit || payload.commits?.[payload.commits.length - 1];

      if (!headCommit) {
        return new Response(JSON.stringify({ message: "No commits found in push event" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const commitData = {
        last_commit_message: headCommit.message,
        last_commit_at: headCommit.timestamp,
        last_commit_url: headCommit.url,
        last_commit_author: headCommit.author?.name || headCommit.author?.username || "Developer",
        last_commit_sha: headCommit.id?.slice(0, 7) || headCommit.id,
        updated_at: new Date().toISOString(),
      };

      // Update matching project by github_repo_name or github_url (case-insensitive)
      const { data: updatedProjects, error: updateError } = await supabase
        .from("projects")
        .update(commitData)
        .or(`github_repo_name.ilike.${repoFullName},github_url.ilike.%${repoFullName}%`)
        .select("id, title, slug");

      if (updateError) {
        console.error("Error updating project in database:", updateError);
      }

      // Record audit log
      await supabase.from("github_activity_logs").insert({
        event_type: "push",
        repo_name: repoFullName,
        commit_message: headCommit.message,
        commit_url: headCommit.url,
        commit_author: headCommit.author?.name,
        commit_sha: headCommit.id?.slice(0, 7),
        raw_payload: payload,
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: `Recorded commit for ${repoFullName}`,
          matched_projects: updatedProjects?.length || 0,
          commit: headCommit.message,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ message: `Ignored unhandled event: ${event}` }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
