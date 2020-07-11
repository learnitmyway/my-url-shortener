var AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
})

var docClient = new AWS.DynamoDB.DocumentClient()

console.log('Importing urls into DynamoDB. Please wait.')

var allURLs = [
  {
    hash: 'abc123',
    originalURL: 'https://example.com/',
    creationDate: '1594465878211',
    expirationDate: '1694465878211',
    userId: '1',
  },
  {
    hash: 'xys780',
    originalURL: 'https://learnitmyway.com/',
    creationDate: '1594465960809',
    expirationDate: '1694465960809',
    userId: '2',
  },
]
allURLs.forEach(
  ({ hash, originalURL, creationDate, expirationDate, userId }) => {
    var params = {
      TableName: 'URLs',
      Item: {
        hash,
        originalURL,
        creationDate,
        expirationDate,
        userId,
      },
    }

    docClient.put(params, (err, data) => {
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
  }
)
