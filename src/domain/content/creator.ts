export type CreatorCategory = 'BUSINESS' | 'FITNESS' | 'MUSIC' | 'BEAUTY' | 'LIFESTYLE';

/** Public display data. IDs remain stable when names, images or order change. */
export interface Creator {
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly followers: string;
  readonly image: string;
  readonly channels?: readonly { platform: string; url: string }[];
  readonly focalX?: number;
  readonly focalY?: number;
  readonly category: CreatorCategory;
}
