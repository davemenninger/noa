#!/usr/bin/env python

# "My friend Salak and I… we were a couple of young fellas out to tear up the galaxy! Ha. On our first mission, we crashed… here. I've been here ever since. I don't even know how long I've been here."

from pyfiglet import Figlet
from sqlite_utils import Database
import briqualon
import cmd, sys

print("starting...")

# TODO: args:
# --help
# --db whatever.db
# --df my_datafile.json
# --pickle my_soup.pkl

db = Database("my_timeline.db")

class Noa(cmd.Cmd):
    def __init__(self, something=[]):
        cmd.Cmd.__init__(self)
        self.pick = None
        self.prompt = '>>> '
        self.dataframe = briqualon.init_dataframe()

        figlet = Figlet(font='starwars')
        print(figlet.renderText('Noa'))
        print("(type 'help' for more commands)")
        print()

        self.do_random_pick(None)

    # TODO: re-fresh data from the internet
    # TODO: drop db
    # TODO: "more" command fetches summary from the page
    # TODO: search by fields
    # TODO: stats

    def do_random_pick(self, arg):
        pick = briqualon.pick(self.dataframe)
        # TODO: check if this pick has been seen
        print("Why don't you look at this?")
        print()
        print(pick)
        print()
        print(pick['Link'].values[0])
        self.pick = pick
        title = pick['Title'].values[0]
        self.prompt = '(' + title + ') >>> '

    def do_no(self, arg):
        print()
        print("Fine.")
        print()
        self.do_random_pick(arg)

    def do_bby(self, arg):
        result = briqualon.search_by(self.dataframe, 'Date', arg + " BBY")
        print(result)

    def do_aby(self, arg):
        result = briqualon.search_by(self.dataframe, 'Date', arg + " ABY")
        print(result)

    def do_df_info(self, arg):
        print(self.dataframe.info())

    def do_seen_it(self, arg):
        pick = self.pick
        title = pick['Title'].values[0]
        link = pick['Link'].values[0]
        db["watches"].insert_all([{"title": title, "link": link, "watched": True}])
        print()
        print("Ok.")
        print()
        self.do_random_pick(arg)

    def do_list_seen(self, arg):
        self.pick = None
        for row in db["watches"].rows:
            print(row)
        self.prompt = '>>> '

    def do_quit(self, arg):
        sys.exit(0)

if __name__ == '__main__':
    Noa().cmdloop()
