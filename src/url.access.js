const { DynamoDB } = require('aws-sdk')

function createDynamoDBClient() {
  return new DynamoDB.DocumentClient()
}

class UrlAccess {
  constructor() {
    this.docClient = createDynamoDBClient()
    this.tableName = process.env.URLS_TABLE_NAME
  }

  async getURLs() {
    console.log('url.access getURLs')
    const params = {
      TableName: this.tableName,
    }

    try {
      const data = await this.docClient.scan(params).promise()
      console.log('Scan succeeded.')
      data.Items.forEach(({ hash, originalURL }) => {
        console.log(' -', hash + ': ' + originalURL)
      })
      return data.Items
    } catch (err) {
      console.log('Unable to scan. Error:', JSON.stringify(err, null, 2))
      throw err
    }
  }

  async createUrl(newUrl) {
    console.log('url.access createUrl newUrl', newUrl)
    const params = {
      TableName: this.tableName,
      Item: newUrl,
    }

    try {
      await this.docClient.put(params).promise()
      console.log('PutItem succeeded:', newUrl.originalURL)
    } catch (err) {
      console.log(
        'Unable to add URL',
        newUrl.originalURL,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      )
    }
  }
}

module.exports = UrlAccess
