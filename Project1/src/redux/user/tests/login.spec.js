import { index } from '../../user';

const expect = global.expect;
const describe = global.describe;
const it = global.test;

describe('common index', () => {
  it('should handle index.js', () => {
    expect(index).toEqual(undefined);
  });
});
