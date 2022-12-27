import { expect } from "chai";
import { fetchRatings } from "../index";

describe('app-store-ratings', function () {
  it('should throw error when no project specified', async () => {
    try {
      await fetchRatings({
        projectId: ''
      })
    } catch(err) {
      expect(err).not.to.equal(undefined);
      expect(err).not.to.equal(null);
      expect((err as Error).message).to.equal('projectId must be a non empty string')
    }
  });
});
