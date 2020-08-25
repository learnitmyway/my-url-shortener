#!/usr/bin/env bash

curl --verbose \
	--header "Content-Type: application/json" \
	--data '{
    "originalUrl": "www.another-example.com"
  }' \
http://localhost:4139/create-url