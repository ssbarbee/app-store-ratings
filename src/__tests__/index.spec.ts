import { expect } from 'chai';
import { fetchRatings } from '../index';
import * as sinon from 'sinon';
import axios from 'axios';
import { join } from 'path';
const mockResponsePath = join(__dirname, '/mock-response.xml');
import { readFileSync } from 'fs-extra';

const mockResponseXML = readFileSync(mockResponsePath).toString();

describe('app-store-ratings', function () {
  beforeEach(() => {
    // stub the axios.get method to return a predefined response
    sinon.stub(axios, 'get').resolves({ data: mockResponseXML });
  });

  afterEach(() => {
    // restore the original implementation of axios.get
    (axios.get as sinon.SinonStub).restore();
  });

  it('should throw an error if projectId is not provided', async () => {
    try {
      await fetchRatings({
        projectId: '',
      });
    } catch (err) {
      expect(err).not.to.equal(undefined);
      expect(err).not.to.equal(null);
      expect((err as Error).message).to.equal('projectId must be a non empty string');
    }
  });

  it('should return an array of ratings', async () => {
    const projectConfig = { projectId: '12345' };
    const ratings = await fetchRatings(projectConfig);
    expect(ratings).to.be.an('array');
    expect(ratings[0]).to.have.keys([
      'author',
      'content',
      'id',
      'rating',
      'title',
      'updatedAt',
      'version',
      'voteCount',
      'voteSum',
    ]);
  });

  it('should construct the url correctly', async () => {
    const projectConfig = { projectId: '12345', country: 'us' };
    await fetchRatings(projectConfig);
    expect(
      (axios.get as sinon.SinonStub).calledWith(
        'https://itunes.apple.com/us/rss/customerreviews/id=12345/sortBy=mostRecent/xml',
      ),
    ).to.equal(true);
  });

  it('should return an empty array if the response is not valid', async () => {
    // make the stubbed axios.get method return invalid data
    (axios.get as sinon.SinonStub).restore();
    sinon.stub(axios, 'get').resolves({ data: 'invalid' });

    const projectConfig = { projectId: '12345' };
    const ratings = await fetchRatings(projectConfig);
    expect(ratings).to.be.an('array').that.is.empty;
  });
});
