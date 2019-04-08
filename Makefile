.PHONY: build, watch;

build: index.js main.css

index.js: $(wildcard src/js/*.js)
	browserify src/js/index.js -o index.js

main.css: $(wildcard src/scss/*.scss)
	sass src/scss/main.scss main.css