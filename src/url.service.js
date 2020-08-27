const UrlAccess = require('./url.access')
const SlugAccess = require('./slug.access')

async function getURLs() {
  console.log('url.service getURLs')
  return new UrlAccess().getURLs()
}

async function getOriginalUrl(slug) {
  console.log('url.service getOriginalUrl slug:', slug)
  const url = await new UrlAccess().getUrl(slug)
  return url.originalURL
}

async function createUrl(originalURL) {
  console.log('url.service createUrl originalUrl', originalURL)

  const slugAccess = new SlugAccess()
  const slug = await slugAccess.getNextSlug()
  await slugAccess.markSlugAsUsed(slug)
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

module.exports = { getURLs, getOriginalUrl, createUrl }
