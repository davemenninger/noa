"use strict";
import "./modules/briqualon.js";
import { registerMediaIconComponent } from "./components/media-icon.js";
import { registerSearchBarComponent } from "./components/search-bar.js";
import { registerWatchedButtonComponent } from "./components/watched-button.js";
import { registerWorkComponent } from "./components/work.js";
import { SWDB } from "./modules/briqualon.js";

(function () {
  const app = () => {
    registerSearchBarComponent();
    registerWorkComponent();
    registerWatchedButtonComponent();
    registerMediaIconComponent();

    try {
      var s = new SWDB("./starwars_canon_media.db");
      s.load_db().then(() => {
        s.select_stuff();
      });
    } catch (e) {
      console.log(e);
    }
  };

  document.addEventListener("DOMContentLoaded", app);
})();
