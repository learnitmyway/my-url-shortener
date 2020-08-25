#!/usr/bin/env bash

curl --verbose \
	--header "Content-Type: application/json" \
	--data '{
    "originalUrl": "'$1'"
  }' \
http://localhost:4139/create-url