const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.listen(port, () => console.log(`App listening on port ${port}!`))


function readJsonFileSync(filepath) {
  var file = fs.readFileSync(filepath);
  return file;
}

// function get path local and return content json file
function getConfig(file) {
  var filepath = __dirname + '/' + file;
  return readJsonFileSync(filepath);
}


app.get('/', (req, res) => res.send('Hello World!'))

app.route('/saplogon/1.0/').post((req, res) => {
  const content = getConfig('src/assets/dummy/login-success.xml');
  // const content = getConfig('src/assets/dummy/login-failed.xml');
  res.send(content);
})

app.route('/poheader/1.0/').post((req, res) => {
  const content = getConfig('src/assets/dummy/poheader.xml');
  res.send(content);
})

app.route('/poitem/1.0/').post((req, res) => {
  const content = getConfig('src/assets/dummy/poitem.xml');
  res.send(content);
})

app.route('/poapproval/1.0/').post((req, res) => {
  // const content = getConfig('src/assets/dummy/poapproval-0.xml'); // already approved before
  const content = getConfig('src/assets/dummy/poapproval-1.xml'); // not approved yet before
  // const content = getConfig('src/assets/dummy/poapproval-2.xml'); // rejected
  res.send(content);
})
