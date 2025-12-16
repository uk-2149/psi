'use client';

import { githubConfig } from '../config/Github';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ActivityCalendar = dynamic(
  () => import('react-activity-calendar').then((mod) => mod.ActivityCalendar),
  { ssr: false },
);

type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubContributionResponse = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | 'NONE'
    | 'FIRST_QUARTILE'
    | 'SECOND_QUARTILE'
    | 'THIRD_QUARTILE'
    | 'FOURTH_QUARTILE';
};

// Helper function to filter contributions to past year
function filterLastYear(contributions: ContributionItem[]): ContributionItem[] {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return contributions.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= oneYearAgo;
  });
}

function Githubsvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
    </svg>
  );
}

export default function Github() {
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${githubConfig.apiUrl}/${githubConfig.username}.json`,
        );
        const data: { contributions?: unknown[] } = await response.json();

        if (data?.contributions && Array.isArray(data.contributions)) {
          // Flatten the nested array structure
          const flattenedContributions = data.contributions.flat();

          // Convert contribution levels to numbers
          const contributionLevelMap = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4,
          };

          // Transform to the expected format
          const validContributions = flattenedContributions
            .filter(
              (item: unknown): item is GitHubContributionResponse =>
                typeof item === 'object' &&
                item !== null &&
                'date' in item &&
                'contributionCount' in item &&
                'contributionLevel' in item,
            )
            .map((item: GitHubContributionResponse) => ({
              date: String(item.date),
              count: Number(item.contributionCount || 0),
              level: (contributionLevelMap[
                item.contributionLevel as keyof typeof contributionLevelMap
              ] || 0) as ContributionItem['level'],
            }));

          if (validContributions.length > 0) {
            // Calculate total contributions
            const total = validContributions.reduce(
              (sum, item) => sum + item.count,
              0,
            );
            setTotalContributions(total);

            // Filter to show only the past year
            const filteredContributions = filterLastYear(validContributions);
            setContributions(filteredContributions);
          } else {
            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto max-w-5xl px-4 animate-fade-in-blur">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {githubConfig.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              <b>{githubConfig.username}</b>&apos;s {githubConfig.subtitle}
            </p>
            {!isLoading && !hasError && totalContributions > 0 && (
              <p className="text-sm text-primary font-medium mt-1">
                Total:{' '}
                <span className="font-black">
                  {totalContributions.toLocaleString()}
                </span>{' '}
                contributions
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">
                {githubConfig.loadingState.description}
              </p>
            </div>
          </div>
        ) : hasError || contributions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Githubsvg className="w-8 h-8" />
            </div>
            <p className="font-medium mb-2">{githubConfig.errorState.title}</p>
            <p className="text-sm mb-4">
              {githubConfig.errorState.description}
            </p>
            <button>
              <Link
                href={`https://github.com/${githubConfig.username}`}
                className="inline-flex items-center gap-2"
              >
                <Githubsvg className="w-4 h-4" />
                {githubConfig.errorState.buttonText}
              </Link>
            </button>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="relative bg-background/50 backdrop-blur-sm rounded-lg border border-dashed dark:border-white/10 border-black/20 p-6">
              <div className="w-full overflow-x-auto ">
                <ActivityCalendar
                  data={contributions}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={githubConfig.fontSize}
                  colorScheme={`dark`}
                  maxLevel={githubConfig.maxLevel}
                  showTotalCount={false}
                  showColorLegend={true}
                  showMonthLabels={true}
                  theme={githubConfig.theme}
                  labels={{
                    months: githubConfig.months,
                    weekdays: githubConfig.weekdays,
                    totalCount: githubConfig.totalCountLabel,
                  }}
                  style={{
                    color: 'rgb(139, 148, 158)',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}