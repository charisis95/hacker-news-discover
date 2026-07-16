import { useEffect, useState } from 'react';
import type { HackerNewsResponse, Story } from '../types/story';

const minimumQueryLength = 3;
const searchDelay = 350;

function mapStory(hit: HackerNewsResponse['hits'][number]): Story | null {
  const title = hit.title ?? hit.story_title;

  if (!title) {
    return null;
  }

  return {
    id: hit.objectID,
    title,
    author: hit.author,
    commentsCount: hit.num_comments ?? 0,
    points: hit.points ?? 0,
    url: hit.url ?? hit.story_url,
  };
}

export function useStorySearch(query: string) {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < minimumQueryLength) {
      setStories([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ query: trimmedQuery, tags: 'story' });
        const response = await fetch(`https://hn.algolia.com/api/v1/search?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = (await response.json()) as HackerNewsResponse;
        const nextStories = data.hits
          .map(mapStory)
          .filter((story): story is Story => story !== null)
          .slice(0, 20);

        setStories(nextStories);
      } catch (requestError) {
        if (requestError instanceof Error && requestError.name !== 'AbortError') {
          setStories([]);
          setError('We could not load stories. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, searchDelay);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return { stories, isLoading, error, minimumQueryLength };
}
