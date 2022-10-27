#!/usr/bin/env python

# https://medium.com/geekculture/web-scraping-tables-in-python-using-beautiful-soup-8bbc31c5803e

from bs4 import BeautifulSoup
import json
import pandas as pd
import pickle
import requests

pd.set_option('display.max_colwidth', 100)

base_url = "https://starwars.fandom.com"
url = base_url + "/wiki/Timeline_of_canon_media"

# TODO: cli options to refresh data
if 1:
    print("reading from datafile")
    with open('datafile.json', 'r') as f:
        data = json.load(f)

else:
    print("fetching from network")
    data = requests.get(url).text
    with open( "datafile.json" , "w" ) as write:
        json.dump( data , write )

# Creating BeautifulSoup object
if 1:
    print("reading from soupfile")
    with open('soup.pkl', 'rb') as f:
        str_soup = pickle.load(f)
        soup = BeautifulSoup(str_soup, 'html.parser')

else:
    print("re-parsing soup")
    soup = BeautifulSoup(data, 'html.parser')
    with open( "soup.pkl" , "wb" ) as write:
        pickle.dump(str(soup), write)

# Creating list with all tables
tables = soup.find_all('table')

# Looking for the table with the classes 'wikitable' and 'sortable'
table = soup.find('table', class_='wikitable sortable headerbackground')

# init dataframe
df = pd.DataFrame(columns=['Date', 'Type', 'Title', 'Link', 'Writer', 'Released'])

# Collecting Ddata
for row in table.tbody.find_all('tr'):
    # Find all data for each column
    columns = row.find_all('td')

    if(columns != []):
        date = columns[0].text.strip()
        media_type = columns[1].text.strip()
        title = columns[2].text.strip()
        writer = columns[3].text.strip()
        released = columns[4].text.strip()
        link = "."
        if columns[2].a:
            link = base_url + columns[2].a.get('href')

        row_df = pd.DataFrame(data={'Date': date,  'Type': media_type, 'Title': title, 'Link': link, 'Writer': writer, 'Released': released}, index=[2, 3])
        df = pd.concat([df, row_df])

# show a random item
pick = df.sample(n=1)
print(pick)
print(pick['Link'])
