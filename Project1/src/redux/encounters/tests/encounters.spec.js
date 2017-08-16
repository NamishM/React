import { encounters } from '../../encounters';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('encounters index', () => {
  it('should handle index.js', () => {
    expect(encounters).toEqual(undefined);
  });
});
