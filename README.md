# My URL shortener

- Set up infrastructure with `terraform apply`
- Add `export URLS_TABLE_NAME='Urls'` to .zshrc
- Add `export SLUGS_TABLE_NAME='Slugs'` to .zshrc
- Add `export USED_INDEX_NAME='UsedIndex'` to .zshrc
- Seed Urls db with `make db/seed/urls`
- Prep Slugs db with `make db/prep/slugs`
- start app with `make start`
- add new urls with `sh scripts/post.sh new-url.com`
