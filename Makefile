
###
### DEVELOPMENT
###

dev:
	HUMBLE_ENV=dev humble up -d
	HUMBLE_ENV=dev humble logs -f

undev:
	HUMBLE_ENV=dev humble down

dev-build:
	HUMBLE_ENV=dev humble exec webapp yarn build

dev-pg:
	HUMBLE_ENV=dev humble up -d postgres
	HUMBLE_ENV=dev humble logs -f



###
### PRODUCTION
###

prod:
	HUMBLE_ENV=prod humble up -d --build
	HUMBLE_ENV=prod humble logs -f
	
unprod:
	HUMBLE_ENV=prod humble down
