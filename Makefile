
dev:
	HUMBLE_ENV=dev humble up -d
	HUMBLE_ENV=dev humble logs -f

dev-build:
	HUMBLE_ENV=dev humble exec webapp yarn build

prod:
	HUMBLE_ENV=prod humble up -d --build
	HUMBLE_ENV=prod humble logs -f
	