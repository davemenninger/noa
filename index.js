"use strict";
import "./modules/briqualon.js";
import { registerMediaIconComponent } from "./components/media-icon.js";
import { registerSWDBComponent } from "./components/swdb.js";
import { registerSearchBarComponent } from "./components/search-bar.js";
import { registerWatchedCheckboxComponent } from "./components/watched-checkbox.js";
import { registerWorkComponent } from "./components/work.js";
import { registerWatchHistoryComponent } from "./components/watch-history.js";

(function () {
  const app = () => {
    registerSearchBarComponent();
    registerWorkComponent();
    registerWatchedCheckboxComponent();
    registerMediaIconComponent();
    registerSWDBComponent();
    registerWatchHistoryComponent();

    var db =  document.getElementById('db');
    var watch_history =  document.getElementById('watch_history');
    var results =  document.getElementById('results');

    try {
      db.initialize().then(() => {
        db.query("select * from media order by random() limit 9", results);
      });
    } catch (e) {
      console.log(e);
    }

    try {
      watch_history.initialize().then(() =>{
        console.log("in here");
      });
    } catch (e) {
      console.log(e);
    }

    var search_bar = document.getElementById('search');
    var random_button = document.getElementById('random');
    random_button.onclick = () => {
      results.innerHTML = "";
      db.query("select * from media order by random() limit 9", results);
    };
  };

  document.addEventListener("DOMContentLoaded", app);
})();
