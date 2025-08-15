"use strict";
import "../jswasm/sqlite3.js";

// https://sqlite.org/wasm/file/demo-123.js?txt

class SWDB {
  db;
  constructor(filename){
    this.filename = filename;
  }

  // https://stackoverflow.com/questions/77899888/sqlite-wasm-how-to-load-existing-db-from-url
  load_db() {
    return new Promise((resolve) => {
      sqlite3InitModule({
        print: log,
        printErr: error,
      }).then(function(sqlite3){
        fetch(this.filename)
          .then((res) => res.arrayBuffer())
          .then((arrayBuffer) => {
            const p = sqlite3.wasm.allocFromTypedArray(arrayBuffer);
            this.db = new sqlite3.oo1.DB();
            const rc = sqlite3.capi.sqlite3_deserialize(
              this.db.pointer,
              "main",
              p,
              arrayBuffer.byteLength,
              arrayBuffer.byteLength,
              sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE,
            );
            this.db.checkRc(rc);

            resolve();
          });
      }.bind(this));
    });
  }

  select_stuff (dest){
    try {
      this.db.exec({
        sql: "select * from media limit 1000",
        rowMode: "object",
        callback: function (row) {
          const w = document.createElement("x-work");
          w.setAttribute("date", row.date);
          w.setAttribute("id", row.id);
          w.setAttribute("media_type", row.media_type);
          w.setAttribute("released", row.released);
          w.setAttribute("released_dt", row.released_dt);
          w.setAttribute("title", row.title);
          dest.append(w);
        },
      });
    } finally {
      // TODO: don't
      // this.db.close();
    }
  };

  query (query, dest){
    try {
      this.db.exec({
        sql: query,
        rowMode: "object",
        callback: function (row) {
          const w = document.createElement("x-work");
          w.setAttribute("date", row.date);
          w.setAttribute("id", row.id);
          w.setAttribute("media_type", row.media_type);
          w.setAttribute("released", row.released);
          w.setAttribute("released_dt", row.released_dt);
          w.setAttribute("title", row.title);
          dest.append(w);
        },
      });
    } finally {
      // TODO: don't
      // this.db.close();
    }
  };
}

const log = (...args) => logHtml("", ...args);
// const warn = (...args) => logHtml("warning", ...args);
const error = (...args) => logHtml("error", ...args);

let logHtml;
if (globalThis.window === globalThis /* UI thread */) {
  console.log("Running db from main UI thread.");
  logHtml = function (cssClass, ...args) {
    const ln = document.createElement("div");
    if (cssClass) ln.classList.add(cssClass);
    ln.append(document.createTextNode(args.join(" ")));
    document.body.append(ln);
  };
}

export { SWDB };
