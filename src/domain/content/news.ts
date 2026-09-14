export interface NewsArticle {
  readonly id: string;
  readonly title: string;
  /** Calendar date (YYYY-MM-DD), without a timezone conversion. */
  readonly publishedAt: string;
  readonly image: string;
  readonly imageAlt?: string;
  readonly externalUrl?: string | null;
}
