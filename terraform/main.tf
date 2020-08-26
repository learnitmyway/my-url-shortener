provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "urls-table" {
  name         = "Urls"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "key"

  attribute {
    name = "key"
    type = "S"
  }
}

resource "aws_dynamodb_table" "slugs-table" {
  name         = "Slugs"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "slug"

  attribute {
    name = "slug"
    type = "S"
  }
}