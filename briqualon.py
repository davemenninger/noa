# https://medium.com/geekculture/web-scraping-tables-in-python-using-beautiful-soup-8bbc31c5803e

from bs4 import BeautifulSoup
from datetime import datetime
import json
import pandas as pd
import pickle
import requests

pd.set_option('display.max_colwidth', 100)

def pick(dataframe):
    # show a random item
    return dataframe.sample(n=1)

def search_by(dataframe, field, value):
    return dataframe[dataframe[field].str.contains(value)]

def init_dataframe():
    base_url = "https://starwars.fandom.com"
    url = base_url + "/wiki/Timeline_of_canon_media"

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
            released_dt = None
            try:
                released_dt = datetime.fromisoformat(released)
            except:
                pass
            link = "."
            if columns[2].a:
                link = base_url + columns[2].a.get('href')

            row_df = pd.DataFrame(data={'Date': date,  'Type': media_type, 'Title': title, 'Link': link, 'Writer': writer, 'Released': released_dt}, index=[2, 3])
            df = pd.concat([df, row_df])

    df['Title'] = df['Title'].astype('string')
    df['Link'] = df['Link'].astype('string')
    df['Writer'] = df['Writer'].astype('string')
    df['Type'] = df['Type'].astype('string')

    return df
