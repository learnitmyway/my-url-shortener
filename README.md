# My URL shortener

- Set up infrastructure with `terraform apply`
- Add `export URLS_TABLE_NAME='Urls'` to local .zshrc
- Seed db with `make db/seed`
- start app with `make start`
- add new urls with `sh scripts/post.sh new-url.com`
