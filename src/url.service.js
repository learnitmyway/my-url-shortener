const AWS = require('aws-sdk')
const md5 = require('md5')

const tableName = 'URLs'

function updateAwsConfig() {
  AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
  })
}

function instantiateDocClient() {
  return new AWS.DynamoDB.DocumentClient()
}

async function getURLs() {
  updateAwsConfig()

  var params = {
    TableName: tableName,
  }

  const data = await instantiateDocClient()
    .scan(params, (err, data) => {
      if (err) {
        console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
        throw err
      } else {
        console.log('Query succeeded.')
        data.Items.forEach(({ hash, originalURL }) => {
          console.log(' -', hash + ': ' + originalURL)
        })
      }
    })
    .promise()

  return data.Items
}

async function createUrl(originalURL) {
  console.log('createUrl originalUrl', originalURL)
  updateAwsConfig()

  const hash = md5(originalURL)
  const newUrl = {
    hash,
    originalURL,
    creationDate: Date.now().toString(),
    expirationDate: Date.now().toString(),
    userId: '3',
  }
  const params = {
    TableName: tableName,
    Item: newUrl,
  }

  instantiateDocClient()
    .put(params, (err) => {
      if (err) {
        console.error(
          'Unable to add URL',
          originalURL,
          '. Error JSON:',
          JSON.stringify(err, null, 2)
        )
      } else {
        console.log('PutItem succeeded:', originalURL)
      }
    })
    .promise()
  const encoded = Buffer.from(hash).toString('base64').substring(0, 5)
  return 'www.my-url-shortener.com/' + encoded
}

module.exports = { getURLs, createUrl }
