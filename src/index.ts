import axios from 'axios';

import { parseStringPromise } from 'xml2js';
import { IAppStoreFeed, IAppStoreRating, IEntry, IProjectConfig } from './types';

/**
 * If the string is not defined or the string's length is 0, return true, otherwise return false.
 * @param {string} [str] - The string to check.
 */
const isEmptyString = (str?: string): boolean => !str || str.length === 0;

/**
 * Constructing the url to fetch the ratings from the App Store based on config.
 * @param {IProjectConfig} [config] - The project config.
 */
const constructUrl = (config: IProjectConfig): string => {
  if (config.country) {
    return `https://itunes.apple.com/${config.country}/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
  }
  return `https://itunes.apple.com/rss/customerreviews/id=${config.projectId}/sortBy=mostRecent/xml`;
};

/**
 * A function that takes in an IEntry object and returns an IAppStoreRating object.
 * @param {IEntry} [entry] - The entry to map.
 */
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

/**
 * An async function that takes in a projectConfig of type IProjectConfig object and returns a promise of an array of IAppStoreRating objects.
 * @param {IProjectConfig} [projectConfig] - The project config.
 */
export const fetchRatings = async (projectConfig: IProjectConfig): Promise<IAppStoreRating[]> => {
  if (isEmptyString(projectConfig.projectId)) {
    throw new Error('projectId must be a non empty string');
  }
  const ratingsUrl = constructUrl(projectConfig);

  try {
    const response = await axios.get<string>(ratingsUrl);
    const json: IAppStoreFeed = await parseStringPromise(response.data);
    if (!json.feed || !json.feed.entry) {
      return [];
    }
    return json.feed.entry.map(mapEntries);
  } catch (err) {
    console.error(
      '[app-store-ratings]: Error occurred while fetching/parsing the App store ratings response. More details: ' +
        (err as Error)?.message || 'Unknown',
    );
    return [];
  }
};
