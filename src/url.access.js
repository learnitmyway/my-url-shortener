const AWS = require('aws-sdk')

function createDynamoDBClient() {
  return new AWS.DynamoDB.DocumentClient()
}

class UrlAccess {
  constructor() {
    AWS.config.update({
      region: 'us-west-2',
      endpoint: 'http://localhost:8000',
    })

    this.docClient = createDynamoDBClient()
    this.tableName = 'URLs'
  }

  async getURLs() {
    console.log('url.access getURLs')
    const params = {
      TableName: this.tableName,
    }

    const data = await this.docClient
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
}

module.exports = UrlAccess
