const debug = require('debug')('app:home-router');

const pg = require('../startup/postgres');


// Render Home page
function getIndex (req, res) {
  res.render('home', {
    title     : 'home',
    jsScript  : 'home.js',
    cssScript : 'home.css'
  });
}


function getSampleEndpoint (req, res) {
  // sample sql query if you want
  // to query the database
  const sqlQuery = {
    text : `
      select * from <tablename>
    `,
    rowMode : 'array',
  };

  res.setHeader('Content-Type', 'application/json');

  // uncomment this to execute sql
  // and return results
  // pg.query(sqlQuery)
  // .then((result) => {
  // const data = [];
  // for (const key in result.rows) {
  // data.push(result.rows[key][0]);
  // }
  // res.json(data);
  // })
  // .catch(err => debug(err.stack));

  const sampleObj = { name: 'jonathan' };
  res.json(sampleObj);
}


module.exports = {
  getIndex,
  getSampleEndpoint
};
