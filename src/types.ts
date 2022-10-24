export interface IEntry {
  updated: string[];
  id: string[];
  title: string[];
  content: Array<{
    _: string;
  }>;
  'im:voteCount': string[];
  'im:voteSum': string[];
  'im:rating': string[];
  'im:version': string[];
  author: Array<{
    name: string;
    uri: string;
  }>;
}

export interface IAppStoreRating {
  id: string;
  title: string;
  updatedAt: string;
  content: string;
  rating: number;
  voteCount: number;
  voteSum: number;
  version: string;
  author: {
    name: string;
    uri: string;
  };
}

export interface IAppStoreFeed {
  feed: {
    entry: IEntry[];
  };
}

export interface IProjectConfig {
  projectId: string;
  country?: string;
}
