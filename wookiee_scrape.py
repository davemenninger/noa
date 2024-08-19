#!/usr/bin/env python

# https://medium.com/geekculture/web-scraping-tables-in-python-using-beautiful-soup-8bbc31c5803e

from bs4 import BeautifulSoup
from datetime import datetime
from pyfiglet import Figlet
import json
import pickle
import requests

base_url = "https://starwars.fandom.com"
url = base_url + "/wiki/Timeline_of_canon_media"

print("starting scrape...")

figlet = Figlet(font='starwars')
print(figlet.renderText('Noa'))
print()

# TODO: option to load from datafile.josn instead
print("fetching from network")
data = requests.get(url).text

print("writing to datafile.json...")
with open( "datafile.json" , "w" ) as write:
    json.dump( data , write )

print("Creating BeautifulSoup object...")
soup = BeautifulSoup(data, 'html.parser')
with open( "soup.pkl" , "wb" ) as write:
    pickle.dump(str(soup), write)
