import type { ReactNode } from 'react';
import type { StoryItemProps } from './StoryItem.types';
import './StoryItem.css';

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightTitle(title: string, query: string): ReactNode {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return title;
  }

  const parts = title.split(new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === normalizedQuery.toLowerCase() ? (
      <mark key={`${part}-${index}`}>{part}</mark>
    ) : (
      part
    ),
  );
}

export function StoryItem({ story, query = '', isSaved = false, onSave, onRemove }: StoryItemProps) {
  const storyTitle = story.url ? (
    <a className="story-item-title" href={story.url} target="_blank" rel="noreferrer">
      {highlightTitle(story.title, query)}
    </a>
  ) : (
    <span className="story-item-title">{highlightTitle(story.title, query)}</span>
  );

  return (
    <article className="story-item">
      <div className="story-item-content">
        {storyTitle}
        <div className="story-item-meta">
          <span>{story.points.toLocaleString()} points</span>
          <span>by {story.author}</span>
          <span>{story.commentsCount.toLocaleString()} comments</span>
        </div>
      </div>

      {onRemove ? (
        <button className="story-item-action story-item-action-remove" type="button" onClick={() => onRemove(story.id)}>
          Remove
        </button>
      ) : (
        <button
          className="story-item-action"
          type="button"
          onClick={() => onSave?.(story)}
          disabled={isSaved}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      )}
    </article>
  );
}
