import records from './partner-catalog.json';

export const partnerCategories = [
  'Business',
  'Tour',
  'Life',
  'Beauty & Fashion',
  'Food & Dining',
] as const;

export type PartnerCategory = (typeof partnerCategories)[number];
export type PartnerLogo = {
  src: string;
  source: string;
  width?: number;
  height?: number;
  viewport?: number[];
  dark?: boolean;
  invert?: boolean;
};
export type Partner = {
  id: string;
  name: string;
  wordmark: string;
  categories: PartnerCategory[];
  logo: PartnerLogo | null;
};

export const partners = records as Partner[];
