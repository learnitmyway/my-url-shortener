.PHONY: \
	list \
	debug \
	db/seed \
	lint lint/fix \
	run \
	start  \

list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

debug:
	DEBUG=express:* $(MAKE) start

db/seed/urls:
	node scripts/seedUrls.js

db/prep/slugs:
	node scripts/prepSlugs.js

lint := npx eslint --config .eslintrc.js '{src,scripts}/**/*.js' --max-warnings 0

lint: 
	${lint}

lint/fix:
	${lint} --fix

run:
	node src/server.js

start:
	npx nodemon