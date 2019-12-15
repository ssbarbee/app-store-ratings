import axios from "axios";

import { parseStringPromise } from "xml2js";
import { IAppStoreFeed, IEntry, IFetchRatingsFilter, IProjectConfig } from "./types";

const isEmptyString = (str?: string): boolean => !str || str.length === 0;
const constructUrl = (config: IProjectConfig): string => {
  if (config.country) {
    return `https://itunes.apple.com/${config.country}/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
  }
  return `https://itunes.apple.com/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
};
const filterEntries = (entries: IEntry[], filter?: IFetchRatingsFilter): IEntry[] => {
  if (!filter) {
    return entries;
  }
  return entries.filter(e => e.updated);
};

export const fetchRatings = async (projectConfig: IProjectConfig, filter?: IFetchRatingsFilter): Promise<IEntry[]> => {
  if (isEmptyString(projectConfig.projectId)) {
    throw new Error("projectId must be a non empty string");
  }
  const ratingsUrl = constructUrl(projectConfig);
  const response = await axios.get(ratingsUrl);
  try {
    const json: IAppStoreFeed = await parseStringPromise(response.data);
    return filterEntries(json.feed.entry, filter);
  } catch (err) {
    throw new Error(err);
  }
};
