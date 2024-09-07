import { SWDB } from "../modules/briqualon.js";

class SWDBComponent extends HTMLElement {
  swdb;
  constructor(){
    super();
    this.ready = false;
    this.swdb = new SWDB("./starwars_canon_media.db");
  }

  connectedCallback() {
    this.appendChild(document.createElement("div"));
    this.update();
  }

  initialize(){
    return new Promise((resolve) => {
      this.swdb.load_db().then(function(){
        this.ready = true;
        this.update();
        resolve();
      }.bind(this));
    });
  }

  update() {
    const d = this.querySelector("div");
    const i = document.createElement('span');
    i.setAttribute('ready', this.ready);
    i.innerHTML = "DB ready: " + (this.ready);
    d.replaceChildren(i);
  }

  query(q, dest){
    this.swdb.query(q,dest);
  }
}

export const registerSWDBComponent = () => customElements.define('x-swdb', SWDBComponent);
