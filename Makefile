install:
	bundle install
update:
	bundle update
build:
	bundle exec jekyll build
serve:
	bundle exec jekyll serve
test:
	bundle exec htmlproofer --check-html --disable-external _site
qa:
	bundle exec htmlproofer --check-html _site
