var AWS = require('aws-sdk')

var docClient = new AWS.DynamoDB.DocumentClient()

console.log('Importing urls into DynamoDB. Please wait.')

var allURLs = [
  {
    slug: 'e',
    originalURL: 'https://example.com/',
    creationDate: '1594465878211',
    expirationDate: '1694465878211',
    userId: '1',
  },
  {
    slug: 'l',
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
