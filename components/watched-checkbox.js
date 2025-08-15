class WatchedCheckbox extends HTMLElement {
  connectedCallback() {
    this.appendChild(document.createElement("div"));
    this.update();
  }

  update() {
    const request = window.indexedDB.open("mydatabase", 2);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const watchList = db.createObjectStore("watchList", { keyPath: "id" });

      const request = watchList.get(this.id);
      request.onsuccess = () => {
        if (request.result) {
          this.checked = request.result.watched;
        }
      };
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["watchList"], "readonly");
      const watchList = transaction.objectStore("watchList");

      const request = watchList.get(this.id);
      request.onsuccess = () => {
        if (request.result) {
          // TODO: hacky
          this.checked = request.result.watched;
          var c = this.children[0].children[0];
          c.checked = this.checked;
        }
      };
    };

    const d = this.querySelector("div");
    d.setAttribute("class", "watched-checkbox");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("id", this.getAttribute("id"));
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = this.checked;
    checkbox.innerText = this.getAttribute("id");
    checkbox.addEventListener("click", this.mark);
    d.appendChild(checkbox);
    // TODO: <label for="" >
    d.append("watched");
  }

  mark(_) {
    // TODO: extract watch history to a component
    const request = window.indexedDB.open("mydatabase", 2);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const watchList = db.createObjectStore("watchList", { keyPath: "id" });

      watchList.put({ id: this.id, watched: this.checked });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["watchList"], "readwrite");
      const watchList = transaction.objectStore("watchList");

      watchList.put({ id: this.id, watched: this.checked });
    };
  }
}

export const registerWatchedCheckboxComponent = () =>
  customElements.define("x-watched-checkbox", WatchedCheckbox);
