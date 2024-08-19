#!/usr/bin/env python

# "My friend Salak and I… we were a couple of young fellas out to tear up the galaxy! Ha. On our first mission, we crashed… here. I've been here ever since. I don't even know how long I've been here."

from bs4 import BeautifulSoup
from pyfiglet import Figlet
from sqlite_utils import Database
import pickle
import hashlib
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(encoding='utf-8', level=logging.DEBUG, format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
logger.info("starting..")

base_url = "https://starwars.fandom.com"
url = base_url + "/wiki/Timeline_of_canon_media"

figlet = Figlet(font='starwars')
logger.info("\n"+figlet.renderText('Briqualon'))

logger.info("reading from soupfile")
with open('soup.pkl', 'rb') as f:
    str_soup = pickle.load(f)
    soup = BeautifulSoup(str_soup, 'html.parser')

# Creating list with all tables
tables = soup.find_all('table')

# Looking for the table with the classes 'wikitable' and 'sortable'
table = soup.find('table', class_='wikitable sortable headerbackground')

logger.info("starting db update...")
db = Database("starwars_canon_media.db")
media = db["media"]

# Collecting Data
for row in table.tbody.find_all('tr'):
    # Find all data for each column
    columns = row.find_all('td')

    if(columns != []):
        date = columns[0].text.strip()
        media_type = columns[1].text.strip()
        title = columns[2].text.strip()
        # writer = columns[3].text.strip()
        released = columns[3].text.strip()
        released_dt = None
        try:
            # TODO: fix dt parse
            released_dt = datetime.fromisoformat(released)
        except:
            pass
        link = "."
        if columns[2].a:
            link = base_url + columns[2].a.get('href')

        id = hashlib.md5(title.encode('utf-8')).hexdigest()
        media.upsert(
                {"id": id, "date": date, "title": title, "media_type": media_type, "released": released, "released_dt": released_dt},
                pk="id"
                )
