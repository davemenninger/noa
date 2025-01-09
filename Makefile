.PHONY: clean all help serve scrape

pickle_file = soup.pkl
db_file = starwars_canon_media.db

all: scrape $(db_file) ## scrapes web and parses data into database

scrape: ## fetch data from wookiepedia
	./wookiee_scrape.py

$(db_file): $(pickle_file) ## parse scraped data into local sqlite file
	./db_update.py

clean: ## Deletes generated HTML and PDF files
	rm -f $(pickle_file) $(html_file)

serve: ## serve local directory
	python3 -m http.server

help: ## Shows this help.
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
	for help_line in $${help_lines[@]}; do \
		IFS=$$'#' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf "%-30s %s\n" $$help_command $$help_info ; \
	done
