provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "urls-table" {
  name         = "Urls"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "slug"

  attribute {
    name = "slug"
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

  attribute {
    name = "used"
    type = "S"
  }

  global_secondary_index {
    name               = "UsedIndex"
    hash_key           = "used"
    projection_type    = "ALL"
  }
}