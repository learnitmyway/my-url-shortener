var AWS = require('aws-sdk')
const md5 = require('md5')

var docClient = new AWS.DynamoDB.DocumentClient()

console.log('Importing urls into DynamoDB. Please wait.')

var allURLs = [
  {
    hash: md5('https://example.com/'),
    originalURL: 'https://example.com/',
    creationDate: '1594465878211',
    expirationDate: '1694465878211',
    userId: '1',
  },
  {
    hash: md5('https://learnitmyway.com/'),
    originalURL: 'https://learnitmyway.com/',
    creationDate: '1594465960809',
    expirationDate: '1694465960809',
    userId: '2',
  },
]
allURLs.forEach((url) => {
  var params = {
    TableName: process.env.URLS_TABLE_NAME,
    Item: { ...url },
  }

  docClient.put(params, (err) => {
    if (err) {
      console.error(
        'Unable to add URL',
        url.originalURL,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      )
    } else {
      console.log('PutItem succeeded:', url.originalURL)
    }
  })
})
