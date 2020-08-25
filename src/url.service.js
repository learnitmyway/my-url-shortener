const AWS = require('aws-sdk')
const md5 = require('md5')
const UrlAccess = require('./url.access')

async function getURLs() {
  console.log('url.service getURLs')
  return new UrlAccess().getURLs()
}

async function createUrl(originalURL) {
  console.log('url.service createUrl originalUrl', originalURL)

  const hash = md5(originalURL)
  const newUrl = {
    hash,
    originalURL,
    creationDate: Date.now().toString(),
    expirationDate: Date.now().toString(),
    userId: '3',
  }
  await new UrlAccess().createUrl(newUrl)

  const encoded = Buffer.from(hash).toString('base64').substring(0, 5)
  return 'www.my-url-shortener.com/' + encoded
}

module.exports = { getURLs, createUrl }
