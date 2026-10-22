import { Project } from '../types';

interface GitHubCommitResponse {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

// In-memory cache to prevent repeatedly hitting GitHub rate limits
const commitCache = new Map<string, {
  message: string;
  sha: string;
  author: string;
  url: string;
  date: string;
  cachedAt: number;
}>();

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

export const fetchLatestGitHubCommit = async (repoFullName: string) => {
  const cached = commitCache.get(repoFullName);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cached;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repoFullName}/commits?per_page=1`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      return null;
    }

    const data: GitHubCommitResponse[] = await res.json();
    if (data && data.length > 0) {
      const latest = data[0];
      const commitInfo = {
        message: latest.commit.message,
        sha: latest.sha.slice(0, 7),
        author: latest.commit.author.name,
        url: latest.html_url,
        date: latest.commit.author.date,
        cachedAt: Date.now(),
      };
      commitCache.set(repoFullName, commitInfo);
      return commitInfo;
    }
  } catch (err) {
    // Graceful fallback to static data
    console.debug(`Could not fetch live commit for ${repoFullName}:`, err);
  }
  return null;
};

/**
 * Enriches a list of projects with real-time GitHub commits if available
 */
export const enrichProjectsWithGitHubCommits = async (projects: Project[]): Promise<Project[]> => {
  return Promise.all(
    projects.map(async (project) => {
      if (!project.github_repo_name) return project;

      const liveCommit = await fetchLatestGitHubCommit(project.github_repo_name);
      if (liveCommit) {
        return {
          ...project,
          last_commit_message: liveCommit.message,
          last_commit_sha: liveCommit.sha,
          last_commit_author: liveCommit.author,
          last_commit_url: liveCommit.url,
          last_commit_at: liveCommit.date,
        };
      }
      return project;
    })
  );
};
