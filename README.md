# Noa

A tool to keep track of one's personal canon media progress.

Noa is implemented as an interactive CLI tool (using Python's [cmd](https://docs.python.org/3/library/cmd.html) class.

* Scrapes data from the [**Timeline of canon media**](https://starwars.fandom.com/wiki/Timeline_of_canon_media) page on Wookieepedia.
* Stores "watched" media in a local db.

## Usage

```sh
$ pip install -r requirements.txt
$ python noa.py
.__   __.   ______        ___
|  \ |  |  /  __  \      /   \
|   \|  | |  |  |  |    /  ^  \
|  . `  | |  |  |  |   /  /_\  \
|  |\   | |  `--'  |  /  _____  \
|__| \__|  \______/  /__/     \__\


(type 'help' for more commands)

Why don't you look at this?

  Date Type                                               Title                                                                                 Link       Writer    Released
3         C  Star Wars Adventures: Ghosts of Vader's Castle 2 †  https://starwars.fandom.com/wiki/Star_Wars_Adventures:_Ghosts_of_Vader%27s_Castle_2  Cavan Scott  2021-09-29

https://starwars.fandom.com/wiki/Star_Wars_Adventures:_Ghosts_of_Vader%27s_Castle_2
(Star Wars Adventures: Ghosts of Vader's Castle 2 †) >>> seen_it

Ok.

Why don't you look at this?

  Date Type             Title                                             Link         Writer    Released
2         C  Poe Dameron 14 †  https://starwars.fandom.com/wiki/Poe_Dameron_14  Charles Soule  2017-05-03

https://starwars.fandom.com/wiki/Poe_Dameron_14
(Poe Dameron 14 †) >>> quit
```

## Features

* Show a random entry from the list of media
* mark media as watched/read

## License

Fandom wiki's content is Creative Commons licensed:
> Community content is available under [CC-BY-SA](https://www.fandom.com/licensing) unless otherwise noted.
