const UrlAccess = require('./url.access')

async function getURLs() {
  console.log('url.service getURLs')
  return new UrlAccess().getURLs()
}

async function createUrl(originalURL) {
  console.log('url.service createUrl originalUrl', originalURL)

  const slug = originalURL.substring(0, 1)
  const newUrl = {
    slug,
    originalURL,
    creationDate: Date.now().toString(),
    expirationDate: Date.now().toString(),
    userId: '3',
  }
  await new UrlAccess().createUrl(newUrl)

  return 'www.my-url-shortener.com/' + slug
}

module.exports = { getURLs, createUrl }
