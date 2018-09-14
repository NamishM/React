const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];
module.export =  resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
  },
};