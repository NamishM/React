const http = require('http');
const path = require('path');
const fs = require('fs');

const writeIssuesToReadme = number => new Promise((resolve, reject) => {
  const file = path.join(__dirname, 'docsBuild', 'README.htm');

  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      const result = data.replace(/{{{issueCount}}}/g, number);

      fs.writeFile(file, result, 'utf8', (err2) => {
        if (err2) {
          reject(err2);
        } else {
          resolve();
        }
      });
    }
  });
});

const postData = body => new Promise((resolve, reject) => {
  // Configure the request
  const options = {
    method: 'POST',
    hostname: 'testtrack2012.srs.com',
    path: '/Scripts/ttcgi.exe',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      Cookie: '_ga=GA1.2.703397570.1474485193',
    },
  };

  // Start the request
  const req = http.request(options, (res) => {
    // Print out the response body
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      resolve(JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    reject(e.message);
  });

  // write data to request body
  req.write(body);
  req.end();
});

const login = '{"requestType":"ProjectSelect","cookie":null,"serverName":"Default","symmetricKey":"","userName":"bboone","password":"srs","credentialsEncrypted":false,"ssoChecked":false,"useExternalAuth":false,"externalCredentials":"","databaseID":2,"projectListID":1,"forceLogout":true,"useTestTrackPro":true,"useTestTrackTCM":true,"useTestTrackRM":true,"useTestTrackRMReviewer":false}';

const getAnywhereBugs = cookie => `{"requestType":"GetRecordList","cookie":"${cookie}","serverName":"Default","symmetricKey":"","entityType":1684431732,"fromIndex":1,"getAvailableColumns":false,"getDisplayColumns":true,"tabID":606,"filterID":61,"columns":[{"entityType":1684431732,"fieldID":1,"width":64},{"entityType":1684431732,"fieldID":25,"width":132},{"entityType":1684431732,"fieldID":33,"width":64},{"entityType":1684431732,"fieldID":50,"width":64},{"entityType":1684431732,"fieldID":105,"width":290},{"entityType":1684431732,"fieldID":2,"width":716,"primarySort":true,"primarySortOrder":1},{"entityType":1684431732,"fieldID":4,"width":147},{"entityType":1684431732,"fieldID":306,"width":171},{"entityType":1684431732,"fieldID":5,"width":64},{"entityType":1684431732,"fieldID":24,"width":64},{"entityType":1684431732,"fieldID":589825,"width":122},{"entityType":1684431732,"fieldID":65542,"width":64}],"drilldownFilterSelectionType":3,"drilldownFilterColumnID":24,"drilldownFilterValue":{"value":92,"itemsList":[92]}}`;

const logOff = cookie => `{"requestType":"Logoff","cookie":"${cookie}","serverName":"Default","symmetricKey":""}`;

let cookie = '';

postData(login)
.then((data) => {
  cookie = data.cookie;
  return postData(getAnywhereBugs(cookie));
})
// .then(data => console.log(JSON.stringify(data.rows, null, 2)))
.then(data => writeIssuesToReadme(data.rows.length))
.then(() => postData(logOff(cookie)))
.catch(ex => console.log(ex));

