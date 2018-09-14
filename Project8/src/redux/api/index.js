import superagent from 'superagent';

export function getEmpDetails() {
  return superagent
    .get('/graphql')
    .query({ query: '{empName, empAge, empSalary}' })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).data.login);
}

export function createEmpDetails() {
  // const empName = 'request.empName';
  // const empAge = 12;
  // const empSalary = 100;
  const query = `query SetData($empName: String, $empAge: Int, $empSalary: Int) {
    setData(empName: $empName, empAge: $empAge, empSalary: $empSalary)
  }`;
  return superagent
    .post('/graphql')
    .query({ query })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).data.login);
}
