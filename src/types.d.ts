declare module namespace {

  export interface Link {
    _rel: string;
    _type: string;
    _href: string;
  }

  export interface Author {
    name: string;
    uri: string;
  }

  export interface Content {
    _type: string;
    __text: string;
  }

  export interface ContentType {
    _term: string;
    _label: string;
    __prefix: string;
  }

  export interface VoteSum {
    __prefix: string;
    __text: string;
  }

  export interface VoteCount {
    __prefix: string;
    __text: string;
  }

  export interface Rating {
    __prefix: string;
    __text: string;
  }

  export interface Version {
    __prefix: string;
    __text: string;
  }

  export interface Author2 {
    name: string;
    uri: string;
  }

  export interface Link2 {
    _rel: string;
    _href: string;
  }

  export interface Entry {
    updated: Date;
    id: string;
    title: string;
    content: Content[];
    contentType: ContentType;
    voteSum: VoteSum;
    voteCount: VoteCount;
    rating: Rating;
    version: Version;
    author: Author2;
    link: Link2;
  }

  export interface Feed {
    id: string;
    title: string;
    updated: Date;
    link: Link[];
    icon: string;
    author: Author;
    rights: string;
    entry: Entry[];
    "_xmlns:im": string;
    _xmlns: string;
    "_xml:lang": string;
  }

  export interface AppStoreFeed {
    feed: Feed;
  }
}