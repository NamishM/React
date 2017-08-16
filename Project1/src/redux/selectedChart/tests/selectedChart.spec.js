import { index } from '../../selectedChart';

const expect = global.expect;
const describe = global.describe;
const it = global.test;

describe('common index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual(undefined);
  });
});
