import type { Story } from '../../types/story';

export interface StoryItemProps {
  story: Story;
  query?: string;
  isSaved?: boolean;
  onSave?: (story: Story) => void;
  onRemove?: (storyId: string) => void;
}
