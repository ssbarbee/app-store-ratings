export interface ILink {
  _rel: string;
  _type: string;
  _href: string;
}

export interface IAuthor {
  name: string;
  uri: string;
}

export interface IContent {
  _type: string;
  __text: string;
}

export interface IContentType {
  _term: string;
  _label: string;
  __prefix: string;
}

export interface IVoteSum {
  __prefix: string;
  __text: string;
}

export interface IVoteCount {
  __prefix: string;
  __text: string;
}

export interface IRating {
  __prefix: string;
  __text: string;
}

export interface IVersion {
  __prefix: string;
  __text: string;
}

export interface IAuthor2 {
  name: string;
  uri: string;
}

export interface ILink2 {
  _rel: string;
  _href: string;
}

export interface IEntry {
  updated: Date;
  id: string;
  title: string;
  content: IContent[];
  contentType: IContentType;
  voteSum: IVoteSum;
  voteCount: IVoteCount;
  rating: IRating;
  version: IVersion;
  author: IAuthor2;
  link: ILink2;
}

export interface IFeed {
  id: string;
  title: string;
  updated: Date;
  link: ILink[];
  icon: string;
  author: IAuthor;
  rights: string;
  entry: IEntry[];
  "_xmlns:im": string;
  _xmlns: string;
  "_xml:lang": string;
}

export interface IAppStoreFeed {
  feed: IFeed;
}

export interface IProjectConfig {
  projectId: string;
  country?: string;
}

export interface IFetchRatingsFilter {
  fromDate?: Date;
}
