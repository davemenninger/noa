"use strict";
import "./modules/briqualon.js";
import { registerMediaIconComponent } from "./components/media-icon.js";
import { registerSWDBComponent } from "./components/swdb.js";
import { registerSearchBarComponent } from "./components/search-bar.js";
import { registerWatchedCheckboxComponent } from "./components/watched-checkbox.js";
import { registerWorkComponent } from "./components/work.js";

(function () {
  const app = () => {
    registerSearchBarComponent();
    registerWorkComponent();
    registerWatchedCheckboxComponent();
    registerMediaIconComponent();
    registerSWDBComponent();

    var db =  document.getElementById('db');
    var results =  document.getElementById('results');

    try {
      db.initialize().then(() => {
        db.query("select * from media limit 3", results);
      });
    } catch (e) {
      console.log(e);
    }

    var search_bar = document.getElementById('search');
  };

  document.addEventListener("DOMContentLoaded", app);
})();
