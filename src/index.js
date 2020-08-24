const express = require('express')
const getURLs = require('./url.service')
const app = express()
const port = 4139

app.get('/', async (req, res) => {
  const URLs = await getURLs()
  res.send(URLs)
})

app.post('/create-url', async (req, res) => {
  console.log('POST request to create-url')
  res.send('POST request to create-url')
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
