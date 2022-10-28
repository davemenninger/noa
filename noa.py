#!/usr/bin/env python

from pyfiglet import Figlet
from sqlite_utils import Database
import briqualon
import cmd, sys
import requests

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
        self.pick = ""
        self.prompt = '>>> '
        self.dataframe = briqualon.init_dataframe()
        figlet = Figlet(font='starwars')
        print(figlet.renderText('Noa'))
        print("My friend Salak and I… we were a couple of young fellas out to tear up the galaxy! Ha. On our first mission, we crashed… here. I've been here ever since. I don't even know how long I've been here.")
        print("type 'help'")

    # TODO: re-fresh data from the internet
    # TODO: drop db

    def do_random_pick(self, arg):
        pick = briqualon.pick(self.dataframe)
        # TODO: check if this pick has been seen
        print(pick)
        print(pick['Link'].values[0])
        self.pick = pick
        title = pick['Title'].values[0]
        self.prompt = '(' + title + ') >>> '

    def do_seen_it(self, arg):
        pick = self.pick
        title = pick['Title'].values[0]
        link = pick['Link'].values[0]
        db["watches"].insert_all([{"title": title, "link": link, "watched": True}])
        self.do_random_pick(arg)

    def do_list_seen(self, arg):
        for row in db["watches"].rows:
            print(row)

    def do_quit(self, arg):
        sys.exit(0)

    def do_print_stuff(self, arg):
        for s in self.stufflist:
            print(s)

if __name__ == '__main__':
    Noa().cmdloop()
