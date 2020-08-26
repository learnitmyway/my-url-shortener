const { DynamoDB } = require('aws-sdk')

const tableName = process.env.SLUGS_TABLE_NAME
console.log('adding slugs to', tableName)

const chars = '1234567890ABCDEF'
for (let i = 0; i < chars.length; i++) {
  const slug = chars[i]
  const params = {
    TableName: tableName,
    Item: {
      slug,
      used: false,
    },
  }

  const docClient = new DynamoDB.DocumentClient()
  docClient.put(params, (err) => {
    if (err) {
      console.log(
        'Unable to add slug',
        slug,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      )
    } else {
      console.log('PutItem succeeded:', slug)
    }
  })
}
