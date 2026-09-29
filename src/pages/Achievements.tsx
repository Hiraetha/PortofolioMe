import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { AchievementCard } from '../components/achievements/AchievementCard';
import { LoadingState, EmptyState, ErrorState } from '../components/ui/States';
import { getAchievements } from '../services/achievements';
import { Achievement } from '../types';

export const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAchievements();
      setAchievements(data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load achievements';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b-3 border-border pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent mb-2">
            <Trophy className="w-4 h-4" /> [VERIFIED_ACCOLADES]
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-sans tracking-tight uppercase text-foreground">
            ACHIEVEMENTS &amp; CERTIFICATIONS
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground max-w-2xl">
            Validated certifications, competitive hackathon awards, and engineering credentials.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingState message="RETRIEVING ACCREDITATIONS..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchAchievements} />
        ) : achievements.length === 0 ? (
          <EmptyState
            title="NO ACHIEVEMENTS RECORDED"
            message="No certifications or awards have been published to the system yet."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <AchievementCard key={item.id} achievement={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
