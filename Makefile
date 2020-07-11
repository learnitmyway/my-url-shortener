.PHONY: \
	list \
	db/create/table/url \
	db/seed \
	lint lint/fix \
	run \
	start  \

list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

db/create/table/url:
	node scripts/create-url-table.js

db/seed:
	node scripts/seed-data.js

lint := npx eslint --config .eslintrc.js '{src,scripts}/**/*.js' --max-warnings 0

lint: 
	${lint}

lint/fix:
	${lint} --fix

run:
	node src/index.js

start:
	npx nodemon