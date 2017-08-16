const expect = global.expect;
const describe = global.describe;
const it = global.test;

const state = {
  chartBinFilter: {
    rooms: 'A',
  },
  entities: {
    rooms: 'A',
  },
};

const chartBinRooms = [{
  selected: true,
  value: 1,
  visible: true,
},
{
  selected: false,
  value: -1,
  visible: true,
},
];

const filteredData = [{
  selected: true,
  value: 1,
  visible: true,
}];

describe('common reducer', () => {
  it('should handle state for chartbinfilter', () => {
    expect(state.chartBinFilter.rooms).toEqual('A');
  });
  it('should handle state for entities', () => {
    expect(state.entities.rooms).toEqual('A');
  });
  it('should handle chartbin room filter methiod', () => {
    expect(chartBinRooms.filter(room =>
      room.selected && room.value !== -1 && room.visible,
    )).toEqual(filteredData);
  });
});

