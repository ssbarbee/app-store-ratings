import axios from "axios";

import { parseStringPromise } from "xml2js";
import AppStoreFeed = namespace.AppStoreFeed;
import Entry = namespace.Entry;

interface IProjectConfig {
  projectId: string;
  country?: string;
}
interface IFetchRatingsFilter {
  fromDate?: Date;
}
const isEmptyString = (str?: string): boolean => !str || str.length === 0;
const constructUrl = (config: IProjectConfig): string => {
  if (config.country) {
    return `https://itunes.apple.com/${config.country}/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
  }
  return `https://itunes.apple.com/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
};
const filterEntries = (entries: Entry[], filter?: IFetchRatingsFilter): Entry[] => {
  if (!filter) {
    return entries;
  }
  return entries.filter(e => e.updated);
};

export const fetchRatings = async (projectConfig: IProjectConfig, filter?: IFetchRatingsFilter): Promise<Entry[]> => {
  if (isEmptyString(projectConfig.projectId)) {
    throw new Error("projectId must be a non empty string");
  }
  const ratingsUrl = constructUrl(projectConfig);
  const response = await axios.get(ratingsUrl);
  try {
    const json: AppStoreFeed = await parseStringPromise(response.data);
    return filterEntries(json.feed.entry, filter);
  } catch (err) {
    throw new Error(err);
  }
};
