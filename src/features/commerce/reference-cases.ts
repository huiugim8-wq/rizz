export const referenceCategories = ['TOUR', 'FOOD', 'BEAUTY', 'LIVING', 'etc.'] as const;
export type ReferenceCategory = (typeof referenceCategories)[number];
export type ReferenceCase = {
  category: ReferenceCategory;
  title: string;
  sales: string;
  volume: string;
  image: string;
};

export const referenceCases = [
  {
    category: 'TOUR',
    title: '채널주인부재중 X 세인트존스호텔',
    sales: '6,523',
    volume: '12.5억',
    image:
      'https://static.wixstatic.com/media/dc99e3_d7e6ae7923d44ad99828d5d6c7141eff~mv2.webp/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/1.webp',
  },
  {
    category: 'TOUR',
    title: '채널주인부재중 X 여수유탑마리나',
    sales: '5,808',
    volume: '10억',
    image:
      'https://static.wixstatic.com/media/dc99e3_96b354f73e674f5fa2406e80d01c279c~mv2.jpg/v1/fill/w_280,h_162,fp_0.50_0.69,q_80,enc_avif,quality_auto/2.jpg',
  },
  {
    category: 'TOUR',
    title: '휴먼스토리 X 세인트존스호텔',
    sales: '3,000',
    volume: '6.6억',
    image:
      'https://static.wixstatic.com/media/dc99e3_64b22ad796ae44f6ae8b868893a6002a~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/3.jpg',
  },
  {
    category: 'TOUR',
    title: '채널주인부재중 X 용평리조트',
    sales: '1,535',
    volume: '6억',
    image:
      'https://static.wixstatic.com/media/dc99e3_873f80ae40044ac995fdab127d6d350f~mv2.webp/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/4.webp',
  },
  {
    category: 'TOUR',
    title: '채널주인부재중 X 소노호텔앤리조트',
    sales: '2,317',
    volume: '5.3억',
    image:
      'https://static.wixstatic.com/media/dc99e3_5ad052067226460bb4d96b0051c62354~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/5.jpg',
  },
  {
    category: 'TOUR',
    title: '예영 X 트래블그램',
    sales: '206',
    volume: '4.2억',
    image:
      'https://static.wixstatic.com/media/dc99e3_348a09808d824f61b0fadc80b6721c94~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/6.jpg',
  },
  {
    category: 'TOUR',
    title: '심장에박현서 X 제주유탑유블레스',
    sales: '1,519',
    volume: '2.4억',
    image:
      'https://static.wixstatic.com/media/dc99e3_7719b274bf5040d281483e5da0fa84fd~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/7.jpg',
  },
  {
    category: 'TOUR',
    title: '채널주인부재중 X 소노비발디파크',
    sales: '640',
    volume: '1.8억',
    image:
      'https://static.wixstatic.com/media/dc99e3_dc9b1a4c18004f40abbb581846e9e220~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/8.jpg',
  },
  {
    category: 'TOUR',
    title: '채널주인부재중 X 제주유탑유블레스',
    sales: '942',
    volume: '1.5억',
    image:
      'https://static.wixstatic.com/media/dc99e3_3c9b454a539d4845aa0f2c093c8aa928~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/9.jpg',
  },
  {
    category: 'FOOD',
    title: '채널주인부재중 X 주당의비결',
    sales: '29,552',
    volume: '6.9억',
    image:
      'https://static.wixstatic.com/media/dc99e3_05a4a99fefcf45b7b3711d8ed910b3c1~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/1.jpg',
  },
  {
    category: 'FOOD',
    title: '심장에박현서 X 뉴베러',
    sales: '33,070',
    volume: '6.7억',
    image:
      'https://static.wixstatic.com/media/dc99e3_980f609f5c2149beae10d7958210a5e7~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/2.jpg',
  },
  {
    category: 'FOOD',
    title: '채널주인부재중 X 더짱터국밥',
    sales: '37,981',
    volume: '3.5억',
    image:
      'https://static.wixstatic.com/media/dc99e3_6f258886ba29446bbffaa282563c895d~mv2.png/v1/fill/w_280,h_162,al_c,q_85,enc_avif,quality_auto/3.png',
  },
  {
    category: 'FOOD',
    title: '예보링 X 널담',
    sales: '23,415',
    volume: '3.4억',
    image:
      'https://static.wixstatic.com/media/dc99e3_d7f5066270f54a8d90ef787856bb2a49~mv2.png/v1/fill/w_280,h_162,al_c,q_85,enc_avif,quality_auto/4.png',
  },
  {
    category: 'FOOD',
    title: '예보링 X 바르닭',
    sales: '9,076',
    volume: '2.9억',
    image:
      'https://static.wixstatic.com/media/dc99e3_f136718f372849c2a45fc2adf7caab41~mv2.jpg/v1/fill/w_280,h_162,fp_0.50_0.48,q_80,enc_avif,quality_auto/5.jpg',
  },
  {
    category: 'FOOD',
    title: '채널주인부재중 X 바르닭',
    sales: '10,994',
    volume: '3.4억',
    image:
      'https://static.wixstatic.com/media/dc99e3_4672a404a4504a8b8852e4c5727f5018~mv2.webp/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/6.webp',
  },
  {
    category: 'FOOD',
    title: '채널주인부재중 X 쑥이네',
    sales: '23,687',
    volume: '3억',
    image:
      'https://static.wixstatic.com/media/dc99e3_98a6101721774c499efbc845c974dac5~mv2.jpg/v1/fill/w_280,h_162,fp_0.50_0.43,q_80,enc_avif,quality_auto/7_jfif.jpg',
  },
  {
    category: 'FOOD',
    title: '채널주인부재중 X 쁠랑뜨',
    sales: '2,117',
    volume: '2.6억',
    image:
      'https://static.wixstatic.com/media/dc99e3_795ef973ad43416c8939d13002b0a236~mv2.jpg/v1/fill/w_280,h_162,fp_0.50_0.55,q_80,enc_avif,quality_auto/8.jpg',
  },
  {
    category: 'FOOD',
    title: '채널주인부재중 X 조조칼국수',
    sales: '12,708',
    volume: '2.7억',
    image:
      'https://static.wixstatic.com/media/dc99e3_80e193d6746647c496a31582973cdba6~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/9.jpg',
  },
  {
    category: 'BEAUTY',
    title: '심장에박현서 X 페이스팩토리',
    sales: '6,975',
    volume: '5.7억',
    image:
      'https://static.wixstatic.com/media/dc99e3_8c732ebcb2db4eea86e2b66bab598549~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'BEAUTY',
    title: '매일제히 X 피부미',
    sales: '17,199',
    volume: '5.7억',
    image:
      'https://static.wixstatic.com/media/dc99e3_e5bbaf7f1a2d4963ac2ca79deec78fa0~mv2.avif/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'BEAUTY',
    title: '매일제히 X sMTS',
    sales: '2,507',
    volume: '3.6억',
    image:
      'https://static.wixstatic.com/media/dc99e3_0aa1a099b06c4a18ae13fee906be09f6~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'BEAUTY',
    title: '예보링 X 디마레',
    sales: '3,935',
    volume: '5억',
    image:
      'https://static.wixstatic.com/media/dc99e3_fcb8be4f8c6144ffb1e6d903274b158e~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'BEAUTY',
    title: '예보링 X 라에스테',
    sales: '13,272',
    volume: '3.7억',
    image:
      'https://static.wixstatic.com/media/dc99e3_7a4616ef6e3a4d5a8c43c8fe9ca41b07~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'BEAUTY',
    title: '심장에박현서 X 게스케',
    sales: '8,398',
    volume: '2.8억',
    image:
      'https://static.wixstatic.com/media/dc99e3_ee8810d62fa44c3487fb43619c4490e6~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'BEAUTY',
    title: '생각없이사는연 X 헤베스템',
    sales: '5,932',
    volume: '3.5억',
    image:
      'https://static.wixstatic.com/media/dc99e3_9120c5192ebf4939b1631240c7c7a826~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'BEAUTY',
    title: '심장에박현서 X 엑소메라',
    sales: '4,741',
    volume: '2억',
    image:
      'https://static.wixstatic.com/media/dc99e3_61b185756e99468697af210973615eaa~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'BEAUTY',
    title: '매일제히 X 바디언스',
    sales: '5,157',
    volume: '1.9억',
    image:
      'https://static.wixstatic.com/media/dc99e3_3d53cf35b2ac4782afc776c6de9a0cd5~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '매일제히 X 코닥',
    sales: '2,448',
    volume: '4.6억',
    image:
      'https://static.wixstatic.com/media/dc99e3_75016352961646b3bff68ed0029d8242~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '매일제히 X 도로시와',
    sales: '11,736',
    volume: '2.4억',
    image:
      'https://static.wixstatic.com/media/dc99e3_355fe6cc940e48b1bde56deb074b9ea3~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '생각없이사는연 X 보바',
    sales: '5,464',
    volume: '1.9억',
    image:
      'https://static.wixstatic.com/media/dc99e3_5c14f99dfa6047a8b06e36c66244226e~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '심장에박현서 X 샤크플렉스타일',
    sales: '868',
    volume: '2.2억',
    image:
      'https://static.wixstatic.com/media/dc99e3_b45d43522b3745dfb0a3389e0cfb843b~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '생각없이사는연 X 포레올라',
    sales: '1,625',
    volume: '0.9억',
    image:
      'https://static.wixstatic.com/media/dc99e3_46121686f8ae49f1a37f58604b30ef06~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '채널주인부재중 X 제스파',
    sales: '641',
    volume: '0.9억',
    image:
      'https://static.wixstatic.com/media/dc99e3_c5b05edfe4194c10812d28b4a916c85c~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '제이제이 X 브랜든',
    sales: '1,929',
    volume: '1.2억',
    image:
      'https://static.wixstatic.com/media/dc99e3_c44257048cfc4ba392121f05d8d90cbc~mv2.png/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '채널주인부재중 X 베러댄라이프',
    sales: '2,138',
    volume: '0.7억',
    image:
      'https://static.wixstatic.com/media/dc99e3_271eb6cfe4364100aeab633cc05cb1c1~mv2.webp/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'LIVING',
    title: '생각없이사는연 X 무스탕',
    sales: '942',
    volume: '0.8억',
    image:
      'https://static.wixstatic.com/media/dc99e3_cb1bf1bf9ffe48ccb4fadee5f5893569~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '채널주인부재중 X 티오더',
    sales: '8',
    volume: '0.02억',
    image:
      'https://static.wixstatic.com/media/dc99e3_6a35deb12db44ae6a5dc818273613939~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '채널주인부재중 X 양양세인트존스 분양권',
    sales: '3',
    volume: '21억',
    image:
      'https://static.wixstatic.com/media/dc99e3_8d0c6b04ebef44ed86dffa99adac6092~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '채널주인부재중 X 스시준 식사권',
    sales: '1,663',
    volume: '2.1억',
    image:
      'https://static.wixstatic.com/media/dc99e3_8bd84feb91ea47b29818f7bb3505a299~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '채널주인부재중 X 양문 식사권',
    sales: '3,158',
    volume: '1.8억',
    image:
      'https://static.wixstatic.com/media/dc99e3_f12d49465eb44bfeb0cc55b0371e22c3~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '채널주인부재중 X 불끈 식사권',
    sales: '1,025',
    volume: '1.1억',
    image:
      'https://static.wixstatic.com/media/dc99e3_0385e954e9e94222bd53583b05e926ce~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '채널주인부재중 X 주렁주렁 입장권',
    sales: '2,603',
    volume: '0.9억',
    image:
      'https://static.wixstatic.com/media/dc99e3_6e2c7053b833493b8d4f5648fcbff005~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '채널주인부재중 X 에이블짐 회원권',
    sales: '259',
    volume: '0.5억',
    image:
      'https://static.wixstatic.com/media/dc99e3_2894988070fa41f7abe956b56b0cb373~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '채널주인부재중 X 고수의운전면허 이용권',
    sales: '151',
    volume: '0.6억',
    image:
      'https://static.wixstatic.com/media/dc99e3_34274e260346411d8b5731cb6a6c2fa5~mv2.jpg/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
  {
    category: 'etc.',
    title: '생각없이사는연 X 어프어프 금액권',
    sales: '217',
    volume: '0.1억',
    image:
      'https://static.wixstatic.com/media/dc99e3_db39690806c44c5d97870e1ac163c7bd~mv2.png/v1/fill/w_280,h_162,al_c,q_80,enc_avif,quality_auto/reference.jpg',
  },
] satisfies ReferenceCase[];
