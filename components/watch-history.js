class WatchHistoryComponent extends HTMLElement {
  ready;
  total;
  constructor(){
    super();
    this.ready = false;
  }

  connectedCallback() {
    this.appendChild(document.createElement("div"));
    this.update();
  }

  initialize(){
    return new Promise((resolve) => {
      this.load_wl().then(function(){
        this.ready = true;
        this.update();
        resolve();
      }.bind(this));
    });
  }

  load_wl(){
    return new Promise((resolve) => {
      const request = window.indexedDB.open("mydatabase", 2);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const watchList = db.createObjectStore("watchList", { keyPath: "id" });
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["watchList"], "readonly");
        const watchList = transaction.objectStore("watchList");

        const request = watchList.count();
        request.onsuccess = () => {
          if (request.result) {
            this.total = request.result;
            this.update();
          }
        };
      };

      resolve();
    });
  }

  update() {
    const d = this.querySelector("div");
    const i = document.createElement('span');
    i.setAttribute('ready', this.ready);
    i.innerHTML = "Watch History ready: " + (this.ready);
    i.innerHTML += "<br>Watch count: " + (this.total);
    d.replaceChildren(i);
  }
}

export const registerWatchHistoryComponent = () => customElements.define('x-watch-history', WatchHistoryComponent);
