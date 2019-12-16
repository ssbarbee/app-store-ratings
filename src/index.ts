import axios from "axios";

import { parseStringPromise } from "xml2js";
import { IAppStoreFeed, IAppStoreRating, IEntry, IProjectConfig } from "./types";

const isEmptyString = (str?: string): boolean => !str || str.length === 0;
const constructUrl = (config: IProjectConfig): string => {
  if (config.country) {
    return `https://itunes.apple.com/${config.country}/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
  }
  return `https://itunes.apple.com/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
};
const mapEntries = (entry: IEntry): IAppStoreRating => ({
  author: {
    name: entry.author[0].name[0],
    uri: entry.author[0].uri[0],
  },
  content: entry.content[0]._,
  id: entry.id[0],
  rating: parseInt(entry['im:rating'][0], 10),
  title: entry.title[0],
  updatedAt: entry.updated[0],
  version: entry['im:version'][0],
  voteCount: parseInt(entry['im:voteCount'][0], 10),
  voteSum: parseInt(entry['im:voteSum'][0], 10),
});

export const fetchRatings = async (projectConfig: IProjectConfig): Promise<IAppStoreRating[]> => {
  if (isEmptyString(projectConfig.projectId)) {
    throw new Error("projectId must be a non empty string");
  }
  const ratingsUrl = constructUrl(projectConfig);
  const response = await axios.get(ratingsUrl);
  try {
    const json: IAppStoreFeed = await parseStringPromise(response.data);
    if(!json.feed || !json.feed.entry) {
      return [];
    }
    return json.feed.entry.map(mapEntries);
  } catch (err) {
    throw new Error(err);
  }
};
