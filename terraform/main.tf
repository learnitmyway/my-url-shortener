provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "urls-table" {
  name         = "Urls"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "hash"

  attribute {
    name = "hash"
    type = "S"
  }
}