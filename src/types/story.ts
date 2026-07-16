export interface Story {
  id: string;
  title: string;
  author: string;
  commentsCount: number;
  points: number;
  url: string | null;
}

export interface HackerNewsHit {
  objectID: string;
  title: string | null;
  story_title: string | null;
  author: string;
  num_comments: number | null;
  points: number | null;
  url: string | null;
  story_url: string | null;
}

export interface HackerNewsResponse {
  hits: HackerNewsHit[];
}
