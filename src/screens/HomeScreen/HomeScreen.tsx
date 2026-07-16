import { useState, type ChangeEvent } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { StoryItem } from '../../components/StoryItem/StoryItem';
import { useStorySearch } from '../../hooks/useStorySearch';
import type { Story } from '../../types/story';
import type { ResultsState } from './HomeScreen.types';
import './HomeScreen.css';

export function HomeScreen() {
  const [query, setQuery] = useState('');
  const [savedStories, setSavedStories] = useState<Story[]>([]);
  const { stories, isLoading, error, minimumQueryLength } = useStorySearch(query);
  const hasSearchQuery = query.trim().length >= minimumQueryLength;

  const resultsState: ResultsState = !hasSearchQuery
    ? 'idle'
    : isLoading
      ? 'loading'
      : error
        ? 'error'
        : stories.length === 0
          ? 'empty'
          : 'success';

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSave = (story: Story) => {
    setSavedStories((currentStories) =>
      currentStories.some((savedStory) => savedStory.id === story.id)
        ? currentStories
        : [story, ...currentStories],
    );
  };

  const handleRemove = (storyId: string) => {
    setSavedStories((currentStories) => currentStories.filter((story) => story.id !== storyId));
  };

  const savedStoryIds = new Set(savedStories.map((story) => story.id));

  return (
    <main className="home-screen">
      <div className="home-screen-backdrop" aria-hidden="true" />
      <section className="home-screen-shell">
        <header className="home-screen-header">
          <div className="home-screen-brand">
            <span className="home-screen-logo">Y</span>
            <span>HN Discover</span>
          </div>
          <div className="home-screen-intro">
            <span className="home-screen-eyebrow">Explore what people are building</span>
            <h1>Find your next great read.</h1>
            <p>Search the latest Hacker News stories and save the ones worth coming back to.</p>
          </div>
          <SearchBar query={query} isLoading={isLoading} onChange={handleQueryChange} />
          <p className="home-screen-hint">Type at least {minimumQueryLength} characters to search.</p>
        </header>

        <section className="home-screen-section" aria-live="polite">
          <div className="home-screen-section-heading">
            <div>
              <span className="home-screen-section-label">Discover</span>
              <h2>Search results</h2>
            </div>
            {resultsState === 'success' && <span className="home-screen-count">{stories.length} stories</span>}
          </div>

          {resultsState === 'idle' && (
            <div className="home-screen-state">
              <span className="home-screen-state-icon">⌕</span>
              <strong>Start with a topic</strong>
              <p>Your search results will appear here.</p>
            </div>
          )}
          {resultsState === 'loading' && (
            <div className="home-screen-list" aria-label="Loading stories">
              {[1, 2, 3].map((item) => <div className="home-screen-skeleton" key={item} />)}
            </div>
          )}
          {resultsState === 'error' && (
            <div className="home-screen-state home-screen-state-error">
              <strong>Something went wrong</strong>
              <p>{error}</p>
            </div>
          )}
          {resultsState === 'empty' && (
            <div className="home-screen-state">
              <strong>No stories found</strong>
              <p>Try another keyword or a broader topic.</p>
            </div>
          )}
          {resultsState === 'success' && (
            <div className="home-screen-list">
              {stories.map((story) => (
                <StoryItem
                  key={story.id}
                  story={story}
                  query={query}
                  isSaved={savedStoryIds.has(story.id)}
                  onSave={handleSave}
                />
              ))}
            </div>
          )}
        </section>

        <section className="home-screen-section">
          <div className="home-screen-section-heading">
            <div>
              <span className="home-screen-section-label">Your list</span>
              <h2>Saved stories</h2>
            </div>
            {savedStories.length > 0 && <span className="home-screen-count">{savedStories.length} saved</span>}
          </div>

          {savedStories.length === 0 ? (
            <div className="home-screen-state home-screen-state-compact">
              <strong>Nothing saved yet</strong>
              <p>Save a story and it will stay here while you browse.</p>
            </div>
          ) : (
            <div className="home-screen-list">
              {savedStories.map((story) => (
                <StoryItem key={story.id} story={story} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
