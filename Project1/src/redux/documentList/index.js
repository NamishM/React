import * as Reducers from './reducers';
import { watchDocumentListRequested, documentListNextPageFlow,
  watchDocumentContentRequested, watchDocumentNotesRequested }
  from './sagas';

const composite = Object.assign(
  { Reducers },
  {
    Sagas: {
      watchDocumentListRequested,
      documentListNextPageFlow,
      watchDocumentContentRequested,
      watchDocumentNotesRequested,
    },
  },
);

export default composite;
