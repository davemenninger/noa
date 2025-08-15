class WatchedButtonComponent extends HTMLElement {
    connectedCallback() {
        this.appendChild(document.createElement("div"));
        this.update();
    }

    update() {
        const d = this.querySelector('div');
        d.setAttribute('class', 'watched-button');
        const b = document.createElement('button');
        b.setAttribute('id', this.getAttribute('id'));
        b.innerText = this.getAttribute('id');
        b.addEventListener("click", this.mark);
        d.appendChild(b);
    }

    mark(event) {
       console.log("mark:", event);
    }

}

export const registerWatchedButtonComponent = () => customElements.define('x-watched-button', WatchedButtonComponent);
