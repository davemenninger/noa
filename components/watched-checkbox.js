class WatchedCheckbox extends HTMLElement {
  connectedCallback() {
    this.appendChild(document.createElement("div"));
    this.update();
  }

  update() {
    const d = this.querySelector("div");
    d.setAttribute("class", "watched-checkbox");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("id", this.getAttribute("id"));
    checkbox.setAttribute("type", "checkbox");
    checkbox.innerText = this.getAttribute("id");
    checkbox.addEventListener("click", this.mark);
    d.appendChild(checkbox);
    // TODO: <label for="" >
    d.append("watched");
  }

  mark(_) {
    console.log("checked:", this.checked);
    console.log("id:", this.id);
  }
}

export const registerWatchedCheckboxComponent = () =>
  customElements.define("x-watched-checkbox", WatchedCheckbox);
