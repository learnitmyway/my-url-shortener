const { DynamoDB } = require('aws-sdk')

function createDynamoDBClient() {
  return new DynamoDB.DocumentClient()
}

class SlugAccess {
  constructor() {
    this.docClient = createDynamoDBClient()
    this.tableName = process.env.SLUGS_TABLE_NAME
    this.usedIndexName = process.env.USED_INDEX_NAME
  }

  async getNextSlug() {
    console.log('slug.access getNextSlug')
    const params = {
      TableName: this.tableName,
      IndexName: this.usedIndexName,
      Limit: 1,
      KeyConditionExpression: 'used = :used',
      ExpressionAttributeValues: {
        ':used': 'false',
      },
    }

    try {
      const data = await this.docClient.query(params).promise()
      console.log('Query succeeded.')
      data.Items.forEach(({ slug }) => {
        console.log(' -', slug)
      })
      return data.Items[0].slug
    } catch (err) {
      console.log('Unable to query. Error:', JSON.stringify(err, null, 2))
      throw err
    }
  }

  async markSlugAsUsed(slug) {
    console.log('slug.access markSlugAsUsed')
    const params = {
      TableName: this.tableName,
      Key: { slug },
      UpdateExpression: 'set used = :used',
      ExpressionAttributeValues: { ':used': 'true' },
    }

    try {
      await this.docClient.update(params).promise()
      console.log('Update succeeded.')
    } catch (err) {
      console.log('Unable to update item. Error:', JSON.stringify(err, null, 2))
      throw err
    }
  }
}

module.exports = SlugAccess
