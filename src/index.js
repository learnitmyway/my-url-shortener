const express = require('express')
const bodyParser = require('body-parser')
const { getURLs } = require('./url.service')
const { createUrl } = require('./url.service')
const app = express()
const port = 4139

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  const URLs = await getURLs()
  res.send(URLs)
})

app.post('/create-url', async (req, res) => {
  console.log('POST request to create-url')
  const origUrl = req.body.originalUrl
  createUrl(origUrl)
  res.send('POST request to create-url')
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
