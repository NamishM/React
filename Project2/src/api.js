import request from 'superagent';
import {
  normalize,
  procSchema,
  tableSchema,
  triggerSchema,
  functionSchema,
  viewSchema,
  tableTypeSchema,
} from './schema';

const basePath = global.config.BASE_PATH;

const generateApiCall = ({ type, jsonSchema }) => ({
  instance,
  procedure,
  param,
  schema,
}) => {
  let url = `${basePath}/1/${type}/${instance}`;

  if (schema) {
    url = `${url}/${schema}`;
  }

  if (procedure && procedure !== type) {
    url = `${url}/${procedure}`;
  }

  if (param) {
    url = `${url}/${param}`;
  }
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        if (!res.body.reduce) {
          resolve({ schemaIds: [], entities: {} });
          return;
        }

        resolve(normalize(jsonSchema, res.body));
      });
  });
};


export const getAvailableDatabases = () => {
  const url = `${basePath}/1/Databases`;

  return new Promise((resolve, reject) => {
    request
      .get(url)
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res.body || []);
      });
  });
};

export const getObjectDefinition = ({
  instance,
  schema,
  name,
}) => {
  const url = `${basePath}/1/ObjectDefinition/${instance}/${schema}/${name}`;

  return new Promise((resolve, reject) => {
    request
      .get(url)
      .accept('text/plain')
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res.body || '');
      });
  });
};

export const getStoredProcs = generateApiCall({
  type: 'Procs',
  jsonSchema: procSchema,
});

export const getTableData = generateApiCall({
  type: 'Tables',
  jsonSchema: tableSchema,
});

export const getFunctions = generateApiCall({
  type: 'Functions',
  jsonSchema: functionSchema,
});

export const getViewData = generateApiCall({
  type: 'Views',
  jsonSchema: viewSchema,
});

export const getTableTypeData = generateApiCall({
  type: 'TableTypes',
  jsonSchema: tableTypeSchema,
});

export const getTriggerData = ({
  instance,
  procedure,
  param,
  schema,
}) => {
  // /dbdoc/1/Triggers/SRSFreedom/config/tr_ReMake_vwApplicationConfiguration
  let url = `${basePath}/1/Triggers/${instance}`;
  if (schema) {
    url = `${url}/${schema}`;
  }

  if (procedure && procedure !== 'Triggers') {
    url = `${url}/${procedure}`;
  }

  return new Promise((resolve, reject) => {
    request
      .get(url)
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        if (!res.body.reduce) {
          resolve({ schemaIds: [], entities: {} });
          return;
        }

        resolve(normalize(triggerSchema, res.body));
      });
  });
};

