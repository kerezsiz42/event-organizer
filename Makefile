.PHONY: clean
clean:
	psql postgres://user:password@localhost:5432/database -c "TRUNCATE option, poll, vote CASCADE;"

.PHONY: generate-interface
generate-interface:
	curl http://localhost:8080/v3/api-docs | jq > openapi-v3.json; \
	cd ./frontend; \
	npm run generate-interface; \
	cd ../
