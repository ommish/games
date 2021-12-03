import { CardLevel, Deck, Noble, Resource } from './types';

const cardBackgrounds: Record<CardLevel, Record<Resource, string[]>> = {
  1: {
    chocolate: ['https://i.redd.it/5424y4jvr8901.jpg'],
    diamond: [
      'https://images.unsplash.com/photo-1418290368169-1c94e6683532?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25vd3klMjBtb3VudGFpbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    ],
    ruby: [
      'https://cache.desktopnexus.com/thumbseg/939/939162-bigthumbnail.jpg',
    ],
    sapphire: [
      'https://s3.eu-west-1.amazonaws.com/prod.news.product.which.co.uk/news/wp-content/uploads/2020/07/Cornish-beach_v2.jpg',
    ],
    emerald: [
      'https://secretcompass.com/wp-content/uploads/2018/01/Jungle-Rot.jpg',
    ],
  },
  2: {
    chocolate: [
      'https://www.baileyjavinscarter.com/wp-content/uploads/2019/10/coal-miner-fatality-killed-on-the-job.jpg',
      'https://im-mining.com/site/wp-content/uploads/2020/08/MS4M5-lead-scaled.jpg',
      'https://d12oja0ew7x0i8.cloudfront.net/images/Article_Images/ImageForArticle_18547(1).jpg',
    ],
    diamond: [
      'https://upload.wikimedia.org/wikipedia/commons/d/de/Eisklettern_kl_engstligenfall.jpg',
      'https://static01.nyt.com/images/2019/07/09/world/09himalaya/merlin_157304859_601b0294-a8c8-488e-8008-23ea5582eef2-superJumbo.jpg',
      'https://ichef.bbci.co.uk/news/976/cpsprodpb/14A56/production/_109466548_crevasses.jpg',
    ],
    ruby: [
      'https://afar-production.imgix.net/uploads/images/post_images/images/yiVtrhuDpt/original_Siphon_Draw_Arizona_State_Parks_and_Trails_copy.jpg?ixlib=rails-0.3.0&q=80',
      'https://wheninyourstate.com/wp-content/uploads/2016/06/hiking.jpg',
      'https://cdnstep-americantownscom.netdna-ssl.com/img/article/az-hiking-retailers-1.jpg',
    ],
    sapphire: [
      'https://thumbs.dreamstime.com/b/seaside-boats-beach-sea-clouds-sky-62381459.jpg',
      'https://ae01.alicdn.com/kf/HTB10lrcghuTBuNkHFNRq6A9qpXaZ.jpg',
      'https://s3-img.pixpa.com/com/500/44121/1550006505-333187-maldives-wooden-boat-blue-sea.jpg',
    ],
    emerald: [
      'https://www.etc.co.th/wp-content/uploads/2014/03/tree-bridge.jpg',
      'https://mrjungletrek.com/wp-content/uploads/2021/04/Untitled-design-32.jpg',
      'https://expeditioncolombia.com/wp-content/uploads/elementor/thumbs/jungle-trek-2-oypnsoxdd4zcys3prmv5708s46ppf77n0gapmaou3c.jpg',
    ],
  },
  3: {
    chocolate: [
      'https://buildingradar.com/wp-content/uploads/Shenzhen.jpg',
      'https://www.mckinsey.com/~/media/mckinsey/business%20functions/operations/our%20insights/how%20to%20build%20a%20skyscraper%20in%20two%20weeks/infra_bg%20zhang%20yue%20interview_1536x1536_original.jpg',
      'https://static.themoscowtimes.com/image/1920/5c/07b91ce489a64fe698bc7dec979dcc99.jpg',
    ],
    diamond: [
      'https://media.cntraveler.com/photos/5e0666ded760ba0008eaf85f/master/w_4500,h_3000,c_limit/Salzburg-winter-wonderlands-GettyImages-1133549034.jpg',
      'https://media.cntraveler.com/photos/59e786988f0e9e16cda5685c/master/w_3776,h_2832,c_limit/Snowmass_09-H-007.jpg',
      'https://a.cdn-hotels.com/gdcs/production197/d330/ea9dd0dc-497a-4f02-83ce-2e263f688ad5.jpg',
    ],
    ruby: [
      'https://i1.wp.com/www.canacreativetravel.com/wp-content/uploads/2020/06/Petra.jpg?fit=1024%2C683&ssl=1',
      'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/fatehpur-sikri-the-city-of-victory-the-deserted-red-stone-city-i-marek-poplawski.jpg',
      'https://www.unusualtraveler.com/wp-content/uploads/2016/05/leshan-giant-buddha.jpg',
    ],
    sapphire: [
      'https://blog-www.pods.com/wp-content/uploads/2019/08/MG_6_1_Miami.jpg',
      'https://www.travelersjoy.com/blog/honeymoon_destination_historic-setting-1.jpg',
      'https://www.fodors.com/wp-content/uploads/2019/03/20GorgeousSidetownsinItaly__HERO_shutterstock_688078159.jpg',
    ],
    emerald: [
      'https://bigseventravel.com/wp-content/uploads/2019/08/cairo-proj.jpg',
      'https://i.guim.co.uk/img/media/34c5b5d3f864f3912a863481e1ebf8de6383cd83/0_0_5757_3454/master/5757.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=c0f656b178248609b303b0d13c68d3c4',
      'https://i.pinimg.com/originals/54/a1/d1/54a1d1cf164e2eec68872a05d520a2f4.jpg',
    ],
  },
};

export const cardBackground = (
  level: CardLevel,
  resource: Resource,
): string => {
  const options = cardBackgrounds[level][resource];
  return options[Math.floor(Math.random() * options.length)];
};

export const DECK: Deck = {
  /**
   * LEVEL 1
   */
  1: [
    {
      level: 1,
      resource: 'chocolate',
      points: 0,
      cost: { diamond: 1, sapphire: 1, emerald: 1, ruby: 1 },
      image: cardBackground(1, 'chocolate'),
    },
    {
      level: 1,
      resource: 'ruby',
      points: 0,
      cost: { diamond: 2, emerald: 1, chocolate: 2 },
      image: cardBackground(1, 'ruby'),
    },
    {
      level: 1,
      resource: 'chocolate',
      points: 0,
      cost: { diamond: 1, sapphire: 2, emerald: 1, ruby: 1 },
      image: cardBackground(1, 'chocolate'),
    },
    {
      level: 1,
      resource: 'emerald',
      points: 1,
      cost: { chocolate: 4 },
      image: cardBackground(1, 'emerald'),
    },
    {
      level: 1,
      resource: 'sapphire',
      points: 0,
      cost: { diamond: 1, emerald: 1, ruby: 2, chocolate: 1 },
      image: cardBackground(1, 'sapphire'),
    },
    {
      level: 1,
      resource: 'sapphire',
      points: 0,
      cost: { sapphire: 1, emerald: 3, ruby: 1 },
      image: cardBackground(1, 'sapphire'),
    },
    {
      level: 1,
      resource: 'emerald',
      points: 0,
      cost: { sapphire: 2, ruby: 2 },
      image: cardBackground(1, 'emerald'),
    },
    {
      level: 1,
      resource: 'ruby',
      points: 0,
      cost: { diamond: 3 },
      image: cardBackground(1, 'ruby'),
    },
    {
      level: 1,
      resource: 'sapphire',
      points: 0,
      cost: { diamond: 1, emerald: 1, ruby: 1, chocolate: 2 },
      image: cardBackground(1, 'sapphire'),
    },
    {
      level: 1,
      resource: 'sapphire',
      points: 0,
      cost: { diamond: 1, chocolate: 2 },
      image: cardBackground(1, 'sapphire'),
    },
    {
      level: 1,
      resource: 'emerald',
      points: 0,
      cost: { diamond: 1, sapphire: 1, ruby: 1, chocolate: 1 },
      image: cardBackground(1, 'emerald'),
    },
    {
      level: 1,
      resource: 'chocolate',
      points: 0,
      cost: { emerald: 1, ruby: 3, chocolate: 1 },
      image: cardBackground(1, 'chocolate'),
    },
    {
      level: 1,
      resource: 'diamond',
      points: 0,
      cost: { diamond: 3, sapphire: 1, chocolate: 1 },
      image: cardBackground(1, 'diamond'),
    },
    {
      level: 1,
      resource: 'ruby',
      points: 1,
      cost: { diamond: 4 },
      image: cardBackground(1, 'ruby'),
    },
    {
      level: 1,
      resource: 'emerald',
      points: 0,
      cost: { diamond: 1, sapphire: 1, ruby: 1, chocolate: 2 },
      image: cardBackground(1, 'emerald'),
    },
    {
      level: 1,
      resource: 'ruby',
      points: 0,
      cost: { diamond: 2, sapphire: 1, emerald: 1, chocolate: 1 },
      image: cardBackground(1, 'ruby'),
    },
    {
      level: 1,
      resource: 'ruby',
      points: 0,
      cost: { diamond: 1, ruby: 1, chocolate: 3 },
      image: cardBackground(1, 'ruby'),
    },
    {
      level: 1,
      resource: 'diamond',
      points: 0,
      cost: { sapphire: 2, chocolate: 2 },
      image: cardBackground(1, 'diamond'),
    },
    {
      level: 1,
      resource: 'emerald',
      points: 0,
      cost: { sapphire: 1, ruby: 2, chocolate: 2 },
      image: cardBackground(1, 'emerald'),
    },
    {
      level: 1,
      resource: 'diamond',
      points: 0,
      cost: { sapphire: 2, emerald: 2, chocolate: 1 },
      image: cardBackground(1, 'diamond'),
    },
    {
      level: 1,
      resource: 'diamond',
      points: 0,
      cost: { ruby: 2, chocolate: 1 },
      image: cardBackground(1, 'diamond'),
    },
    {
      level: 1,
      resource: 'chocolate',
      points: 0,
      cost: { diamond: 2, sapphire: 2, ruby: 1 },
      image: cardBackground(1, 'chocolate'),
    },
    {
      level: 1,
      resource: 'chocolate',
      points: 0,
      cost: { diamond: 2, emerald: 2 },
      image: cardBackground(1, 'chocolate'),
    },
    {
      level: 1,
      resource: 'ruby',
      points: 0,
      cost: { diamond: 2, ruby: 2 },
      image: cardBackground(1, 'ruby'),
    },
    {
      level: 1,
      resource: 'diamond',
      points: 0,
      cost: { sapphire: 1, emerald: 1, ruby: 1, chocolate: 1 },
      image: cardBackground(1, 'diamond'),
    },
    {
      level: 1,
      resource: 'sapphire',
      points: 0,
      cost: { diamond: 1, emerald: 2, ruby: 2 },
      image: cardBackground(1, 'sapphire'),
    },
    {
      level: 1,
      resource: 'chocolate',
      points: 0,
      cost: { emerald: 3 },
      image: cardBackground(1, 'chocolate'),
    },
    {
      level: 1,
      resource: 'sapphire',
      points: 0,
      cost: { emerald: 2, chocolate: 2 },
      image: cardBackground(1, 'sapphire'),
    },
    {
      level: 1,
      resource: 'sapphire',
      points: 0,
      cost: { chocolate: 3 },
      image: cardBackground(1, 'sapphire'),
    },
    {
      level: 1,
      resource: 'emerald',
      points: 0,
      cost: { diamond: 2, sapphire: 1 },
      image: cardBackground(1, 'emerald'),
    },
    {
      level: 1,
      resource: 'diamond',
      points: 0,
      cost: { sapphire: 3 },
      image: cardBackground(1, 'diamond'),
    },
    {
      level: 1,
      resource: 'ruby',
      points: 0,
      cost: { diamond: 1, sapphire: 1, emerald: 1, chocolate: 1 },
      image: cardBackground(1, 'ruby'),
    },
    {
      level: 1,
      resource: 'chocolate',
      points: 0,
      cost: { emerald: 2, ruby: 1 },
      image: cardBackground(1, 'chocolate'),
    },
    {
      level: 1,
      resource: 'diamond',
      points: 0,
      cost: { sapphire: 1, emerald: 2, ruby: 1, chocolate: 1 },
      image: cardBackground(1, 'diamond'),
    },
    {
      level: 1,
      resource: 'ruby',
      points: 0,
      cost: { sapphire: 2, emerald: 1 },
      image: cardBackground(1, 'ruby'),
    },
    {
      level: 1,
      resource: 'sapphire',
      points: 1,
      cost: { ruby: 4 },
      image: cardBackground(1, 'sapphire'),
    },
    {
      level: 1,
      resource: 'diamond',
      points: 1,
      cost: { emerald: 4 },
      image: cardBackground(1, 'diamond'),
    },
    {
      level: 1,
      resource: 'chocolate',
      points: 1,
      cost: { sapphire: 4 },
      image: cardBackground(1, 'chocolate'),
    },
    {
      level: 1,
      resource: 'emerald',
      points: 0,
      cost: { diamond: 1, sapphire: 3, emerald: 1 },
      image: cardBackground(1, 'emerald'),
    },
    {
      level: 1,
      resource: 'emerald',
      points: 0,
      cost: { ruby: 3 },
      image: cardBackground(1, 'emerald'),
    },
  ],

  /**
   * LEVEL 2
   */
  2: [
    {
      level: 2,
      resource: 'chocolate',
      points: 2,
      cost: { emerald: 5, ruby: 3 },
      image: cardBackground(2, 'chocolate'),
    },
    {
      level: 2,
      resource: 'ruby',
      points: 1,
      cost: { sapphire: 3, ruby: 2, chocolate: 3 },
      image: cardBackground(2, 'ruby'),
    },
    {
      level: 2,
      resource: 'ruby',
      points: 3,
      cost: { ruby: 6 },
      image: cardBackground(2, 'ruby'),
    },
    {
      level: 2,
      resource: 'emerald',
      points: 2,
      cost: { emerald: 5 },
      image: cardBackground(2, 'emerald'),
    },
    {
      level: 2,
      resource: 'diamond',
      points: 2,
      cost: { ruby: 5, chocolate: 3 },
      image: cardBackground(2, 'diamond'),
    },
    {
      level: 2,
      resource: 'emerald',
      points: 2,
      cost: { sapphire: 5, emerald: 3 },
      image: cardBackground(2, 'emerald'),
    },
    {
      level: 2,
      resource: 'ruby',
      points: 2,
      cost: { chocolate: 5 },
      image: cardBackground(2, 'ruby'),
    },
    {
      level: 2,
      resource: 'emerald',
      points: 1,
      cost: { diamond: 2, sapphire: 3, chocolate: 2 },
      image: cardBackground(2, 'emerald'),
    },
    {
      level: 2,
      resource: 'sapphire',
      points: 1,
      cost: { sapphire: 2, emerald: 2, ruby: 3 },
      image: cardBackground(2, 'sapphire'),
    },
    {
      level: 2,
      resource: 'chocolate',
      points: 1,
      cost: { diamond: 3, emerald: 3, chocolate: 2 },
      image: cardBackground(2, 'chocolate'),
    },
    {
      level: 2,
      resource: 'diamond',
      points: 2,
      cost: { emerald: 1, ruby: 4, chocolate: 2 },
      image: cardBackground(2, 'diamond'),
    },
    {
      level: 2,
      resource: 'emerald',
      points: 1,
      cost: { diamond: 3, emerald: 2, ruby: 3 },
      image: cardBackground(2, 'emerald'),
    },
    {
      level: 2,
      resource: 'sapphire',
      points: 3,
      cost: { sapphire: 6 },
      image: cardBackground(2, 'sapphire'),
    },
    {
      level: 2,
      resource: 'sapphire',
      points: 2,
      cost: { diamond: 5, sapphire: 3 },
      image: cardBackground(2, 'sapphire'),
    },
    {
      level: 2,
      resource: 'ruby',
      points: 2,
      cost: { diamond: 3, chocolate: 5 },
      image: cardBackground(2, 'ruby'),
    },
    {
      level: 2,
      resource: 'ruby',
      points: 1,
      cost: { diamond: 2, ruby: 2, chocolate: 3 },
      image: cardBackground(2, 'ruby'),
    },
    {
      level: 2,
      resource: 'ruby',
      points: 2,
      cost: { diamond: 1, sapphire: 4, emerald: 2 },
      image: cardBackground(2, 'ruby'),
    },
    {
      level: 2,
      resource: 'chocolate',
      points: 2,
      cost: { diamond: 5 },
      image: cardBackground(2, 'chocolate'),
    },
    {
      level: 2,
      resource: 'diamond',
      points: 3,
      cost: { diamond: 6 },
      image: cardBackground(2, 'diamond'),
    },
    {
      level: 2,
      resource: 'sapphire',
      points: 2,
      cost: { sapphire: 5 },
      image: cardBackground(2, 'sapphire'),
    },
    {
      level: 2,
      resource: 'diamond',
      points: 2,
      cost: { ruby: 5 },
      image: cardBackground(2, 'diamond'),
    },
    {
      level: 2,
      resource: 'sapphire',
      points: 1,
      cost: { sapphire: 2, emerald: 3, chocolate: 3 },
      image: cardBackground(2, 'sapphire'),
    },
    {
      level: 2,
      resource: 'diamond',
      points: 1,
      cost: { emerald: 3, ruby: 2, chocolate: 2 },
      image: cardBackground(2, 'diamond'),
    },
    {
      level: 2,
      resource: 'chocolate',
      points: 2,
      cost: { sapphire: 1, emerald: 4, ruby: 2 },
      image: cardBackground(2, 'chocolate'),
    },
    {
      level: 2,
      resource: 'chocolate',
      points: 1,
      cost: { diamond: 3, sapphire: 2, emerald: 2 },
      image: cardBackground(2, 'chocolate'),
    },
    {
      level: 2,
      resource: 'chocolate',
      points: 3,
      cost: { chocolate: 6 },
      image: cardBackground(2, 'chocolate'),
    },
    {
      level: 2,
      resource: 'emerald',
      points: 3,
      cost: { emerald: 6 },
      image: cardBackground(2, 'emerald'),
    },
    {
      level: 2,
      resource: 'sapphire',
      points: 2,
      cost: { diamond: 2, ruby: 1, chocolate: 4 },
      image: cardBackground(2, 'sapphire'),
    },
    {
      level: 2,
      resource: 'emerald',
      points: 2,
      cost: { diamond: 4, sapphire: 2, chocolate: 1 },
      image: cardBackground(2, 'emerald'),
    },
    {
      level: 2,
      resource: 'diamond',
      points: 1,
      cost: { diamond: 2, sapphire: 3, ruby: 3 },
      image: cardBackground(2, 'diamond'),
    },
  ],

  /**
   * LEVEL 3
   */
  3: [
    {
      level: 3,
      resource: 'sapphire',
      points: 3,
      cost: { diamond: 3, emerald: 3, ruby: 3, chocolate: 5 },
      image: cardBackground(3, 'sapphire'),
    },
    {
      level: 3,
      resource: 'diamond',
      points: 4,
      cost: { diamond: 3, ruby: 3, chocolate: 6 },
      image: cardBackground(3, 'diamond'),
    },
    {
      level: 3,
      resource: 'sapphire',
      points: 5,
      cost: { diamond: 7, sapphire: 3 },
      image: cardBackground(3, 'sapphire'),
    },
    {
      level: 3,
      resource: 'chocolate',
      points: 4,
      cost: { emerald: 3, ruby: 6, chocolate: 3 },
      image: cardBackground(3, 'chocolate'),
    },
    {
      level: 3,
      resource: 'sapphire',
      points: 4,
      cost: { diamond: 6, sapphire: 3, chocolate: 3 },
      image: cardBackground(3, 'sapphire'),
    },
    {
      level: 3,
      resource: 'chocolate',
      points: 5,
      cost: { ruby: 7, chocolate: 3 },
      image: cardBackground(3, 'chocolate'),
    },
    {
      level: 3,
      resource: 'sapphire',
      points: 4,
      cost: { diamond: 7 },
      image: cardBackground(3, 'sapphire'),
    },
    {
      level: 3,
      resource: 'ruby',
      points: 4,
      cost: { sapphire: 3, emerald: 6, ruby: 3 },
      image: cardBackground(3, 'ruby'),
    },
    {
      level: 3,
      resource: 'ruby',
      points: 5,
      cost: { emerald: 7, ruby: 3 },
      image: cardBackground(3, 'ruby'),
    },
    {
      level: 3,
      resource: 'emerald',
      points: 4,
      cost: { diamond: 3, sapphire: 6, emerald: 3 },
      image: cardBackground(3, 'emerald'),
    },
    {
      level: 3,
      resource: 'ruby',
      points: 4,
      cost: { emerald: 7 },
      image: cardBackground(3, 'ruby'),
    },
    {
      level: 3,
      resource: 'diamond',
      points: 5,
      cost: { diamond: 3, chocolate: 7 },
      image: cardBackground(3, 'diamond'),
    },
    {
      level: 3,
      resource: 'diamond',
      points: 3,
      cost: { sapphire: 3, emerald: 3, ruby: 5, chocolate: 3 },
      image: cardBackground(3, 'diamond'),
    },
    {
      level: 3,
      resource: 'ruby',
      points: 3,
      cost: { diamond: 3, sapphire: 5, emerald: 2, chocolate: 3 },
      image: cardBackground(3, 'ruby'),
    },
    {
      level: 3,
      resource: 'chocolate',
      points: 4,
      cost: { ruby: 7 },
      image: cardBackground(3, 'chocolate'),
    },
    {
      level: 3,
      resource: 'emerald',
      points: 3,
      cost: { diamond: 4, sapphire: 3, ruby: 3, chocolate: 3 },
      image: cardBackground(3, 'emerald'),
    },
    {
      level: 3,
      resource: 'diamond',
      points: 4,
      cost: { chocolate: 7 },
      image: cardBackground(3, 'diamond'),
    },
    {
      level: 3,
      resource: 'emerald',
      points: 5,
      cost: { sapphire: 7, emerald: 3 },
      image: cardBackground(3, 'emerald'),
    },
    {
      level: 3,
      resource: 'chocolate',
      points: 3,
      cost: { diamond: 3, sapphire: 3, emerald: 5, ruby: 3 },
      image: cardBackground(3, 'chocolate'),
    },
    {
      level: 3,
      resource: 'emerald',
      points: 4,
      cost: { sapphire: 7 },
      image: cardBackground(3, 'emerald'),
    },
  ],
};

export const NOBLES: Noble[] = [
  {
    image:
      'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/277/1000/1000/636252769861281900.jpeg',
    points: 3,
    cost: { emerald: 3, sapphire: 3, diamond: 3 },
  },
  {
    image:
      'https://i.pinimg.com/originals/9f/19/3f/9f193fb4082da3c8db4d32cb55f93493.png',
    points: 3,
    cost: { sapphire: 4, emerald: 4 },
  },
  {
    image:
      'https://i.pinimg.com/originals/40/e5/32/40e532b7b8c1ffcbd526153af311fe7f.png',
    points: 3,
    cost: { emerald: 3, sapphire: 3, ruby: 3 },
  },
  {
    image:
      'https://i.pinimg.com/originals/1d/2b/53/1d2b53af6d1f4ea263ee37de2d860c49.png',
    points: 3,
    cost: { ruby: 4, emerald: 4 },
  },
  {
    image: 'https://www.gmbinder.com/images/5mPEtBs.png',
    points: 3,
    cost: { chocolate: 4, diamond: 4 },
  },
  {
    image:
      'https://www.belloflostsouls.net/wp-content/uploads/2020/11/elven-nobility.png',
    points: 3,
    cost: { chocolate: 3, ruby: 3, diamond: 3 },
  },
  {
    image:
      'https://i.pinimg.com/originals/c2/6b/fe/c26bfe0db2bc706fdae7aaa3c0281fa8.png',
    points: 3,
    cost: { sapphire: 4, diamond: 4 },
  },
  {
    image: 'https://www.dandwiki.com/w/images/b/b3/Dwarven_noble.jpg',
    points: 3,
    cost: { chocolate: 4, ruby: 4 },
  },
  {
    image:
      'http://heroesoffaerun.wdfiles.com/local--files/neverwinter-baronies/BaronUrthobarkTurnskull.jpg',
    points: 3,
    cost: { chocolate: 3, sapphire: 3, diamond: 3 },
  },
  {
    image:
      'https://i.pinimg.com/originals/0c/da/00/0cda00f2c9a2bb4a08936d140c3af631.png',
    points: 3,
    cost: { chocolate: 3, ruby: 3, emerald: 3 },
  },
];