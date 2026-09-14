export type RailItem = readonly [string, string];

export const mcnRail: RailItem[] = [
  ['Artist', '/mcn'],
  ['Management', '/management'],
  ['Voice', '/voice-artist'],
];

export const commerceRail: RailItem[] = [
  ['Commerce', '/commerce'],
  ['Partners', '/partners'],
  ['Reference', '/reference'],
  ['Voice', '/voice-brand'],
];

export const fnbRail: RailItem[] = [
  ['F&B 이야기', '/seogyodak-2'],
  ['도그아웃', '/dogout'],
  ['서교닭매운탕', '/seogyodak'],
  ['스시준', '/sushijun-1'],
  ['에끼우동', '/ekiudon-1'],
];

export const navigation = [
  ['MCN', '/mcn'],
  ['Commerce', '/commerce'],
  ['Academy', '/academy'],
  ['Property', '/property'],
  ['F&B', '/seogyodak-2'],
  ['Community', '/news'],
  ['Career', '/career'],
  ['Admin', '/admin/login'],
] as const;
