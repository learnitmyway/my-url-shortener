const AWS = require('aws-sdk')
const md5 = require('md5')

async function getURLs() {
  AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
  })

  var docClient = new AWS.DynamoDB.DocumentClient()

  var params = {
    TableName: 'URLs',
  }

  const data = await docClient
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

async function createUrl(originalUrl) {
  console.log('createUrl originalUrl', originalUrl)
  const hash = Buffer.from(md5(originalUrl)).toString('base64').substring(0, 5)
  return hash
}

module.exports = { getURLs, createUrl }
