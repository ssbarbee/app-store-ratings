import axios from "axios";

var parseStringPromise = require("xml2js").parseStringPromise;
import AppStoreFeed = namespace.AppStoreFeed;
import Entry = namespace.Entry;

type ProjectConfig = {
  projectId: string;
  country?: string;
}
type FetchRatingsFilter = {
  fromDate?: Date;
}
const isEmptyString = (str?: string): boolean => !str || str.length === 0;
const constructUrl = (config: ProjectConfig): string => {
  if (config.country) {
    return `https://itunes.apple.com/${config.country}/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
  }
  return `https://itunes.apple.com/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
};
const filterEntries = (entries: Entry[], filter?: FetchRatingsFilter): Entry[] => {
  if (!filter) {
    return entries;
  }
  return entries.filter(e => e.updated);
};

export const fetchRatings = async (projectConfig: ProjectConfig, filter?: FetchRatingsFilter): Promise<Entry[]> => {
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
