const express = require('express')
const bodyParser = require('body-parser')
const { getURLs, getOriginalUrl } = require('./url.service')
const { createUrl } = require('./url.service')
const app = express()
const port = 4139

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  const URLs = await getURLs()
  res.send(URLs)
})

app.get('/:slug', async (req, res) => {
  const slug = req.params.slug
  const originalUrl = await getOriginalUrl(slug)
  res.redirect(originalUrl)
})

app.post('/create-url', async (req, res) => {
  console.log('POST request to create-url')
  const origUrl = req.body.originalUrl
  const shortenedUrl = await createUrl(origUrl)
  res.send(shortenedUrl)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
