.PHONY: clean
clean:
	psql postgres://user:password@localhost:5432/database -c "TRUNCATE option, poll, vote CASCADE;"
