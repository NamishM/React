
import {
  trueTimeout,
  reduceObjectsToString,
  findObjectsInIdString,
  singleLineString,
} from '../index';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('trueTimeout', () => {
  it('should handle return after specific time interval', () => {
    const res = trueTimeout(() => 2 + 2, 100);
    expect(res()).toEqual(undefined);
  });
});

describe('reduceObjectsToString', () => {
  it('should return empty string for any non array value', () => {
    expect(reduceObjectsToString(0)).toEqual('');
    expect(reduceObjectsToString(false)).toEqual('');
    expect(reduceObjectsToString(null)).toEqual('');
    expect(reduceObjectsToString(undefined)).toEqual('');
    expect(reduceObjectsToString()).toEqual('');
    expect(reduceObjectsToString('')).toEqual('');
    expect(reduceObjectsToString('TEST')).toEqual('');
  });

  it('should return empty string for an empty array', () => {
    expect(reduceObjectsToString([])).toEqual('');
  });

  it('should return a the contents of a single property for an array of 1 item', () => {
    expect(reduceObjectsToString(
      [
        { value: 'test1' },
      ],
      'value',
    )).toEqual('test1');
  });

  it('should return a the contents of a single property for an array of 1 item as a string', () => {
    expect(reduceObjectsToString(
      [
        { value: 1 },
      ],
      'value',
    )).toBe('1');
  });

  it('should return a concatenated list of properties for >= 2 items', () => {
    expect(reduceObjectsToString(
      [
        { value: 'test1' },
        { value: 'test2' },
      ],
      'value',
    )).toEqual('test1,test2');
  });

  it('should return a concatenated list of properties for >= 2 items using the specified delimiter', () => {
    expect(reduceObjectsToString(
      [
        { value: 'test1' },
        { value: 'test2' },
      ],
      'value',
      '|',
    )).toEqual('test1|test2');
  });

  it('should return a concatenated list of properties for >= 2 items using a supplied property accessor function', () => {
    expect(reduceObjectsToString(
      [
        { value: 'test1' },
        { value: 'test2' },
      ],
      obj => obj.value,
    )).toEqual('test1,test2');
  });

  it('should return a concatenated list of properties for >= 2 items using a supplied property accessor function to get more than 2 properties', () => {
    expect(reduceObjectsToString(
      [
        {
          value: 'test1',
          value2: 'test1-1',
        },
        {
          value: 'test2',
          value2: 'test2-2',
        },
      ],
      obj => `${obj.value}+${obj.value2}`,
    )).toEqual('test1+test1-1,test2+test2-2');
  });

  it('should work for nested arrays', () => {
    expect(reduceObjectsToString(
      [
        [
          { value: 'test0' },
          { value: 'test1' },
          { value: 'test2' },
        ],
        [
          { value: 'test3' },
          { value: 'test4' },
          { value: 'test5' },
        ],
      ],
      obj => reduceObjectsToString(obj, 'value', '+'),
    )).toEqual('test0+test1+test2,test3+test4+test5');
  });
});

describe('findObjectsInIdString', () => {
  it('should return empty array for empty idString', () => {
    expect(findObjectsInIdString({
      idString: '',
      property: 'id',
      items: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ],
    })).toEqual([]);
  });

  it('should return a single item for a single id', () => {
    expect(findObjectsInIdString({
      idString: '1',
      property: 'id',
      items: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ],
    })).toEqual([{ id: '1' }]);
  });

  it('should return multiple items for multiple ids', () => {
    expect(findObjectsInIdString({
      idString: '1,2,3',
      property: 'id',
      items: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ],
    })).toEqual([
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ]);
  });

  it('should allow you to supply your own matching property as a function', () => {
    expect(findObjectsInIdString({
      idString: '1',
      property: item => item.id,
      items: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ],
    })).toEqual([{ id: '1' }]);
  });

  it('should allow you to transform each item as it is found', () => {
    expect(findObjectsInIdString({
      idString: '2',
      property: 'id',
      onFind: item => ({ ...item, foo: 'bar' }),
      items: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ],
    })).toEqual([{ id: '2', foo: 'bar' }]);
  });

  it('should allow you to override the delimiter', () => {
    expect(findObjectsInIdString({
      idString: '1|2|3',
      property: 'id',
      delimiter: '|',
      items: [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ],
    })).toEqual([
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ]);
  });
});

describe('singleLineString', () => {
  it('should convert multiline template strings into a single line.', () => {
    expect(singleLineString`testing
    is
    so
    much
    fun`).toBe('testingissomuchfun');
  });
  it('should convert multiline template values into a single line.', () => {
    const val = [1, 2, 3];
    expect(singleLineString(`testing
    is
    so
    much
    fun`), ...val).toBe('t');
  });
  it('should convert template values with string into a single line mix value output.', () => {
    const val = [1, 2];
    expect(singleLineString('testing is', ...val)).toBe('t1e2s');
  });
});
