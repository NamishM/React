import * as Reducers from './reducers';
import { watchDocumentTabsListRequested, documentTabsListNextPageFlow }
  from './sagas';

const composite = Object.assign(
  { Reducers },
  {
    Sagas: {
      watchDocumentTabsListRequested,
      documentTabsListNextPageFlow,
    },
  },
);

export default composite;
