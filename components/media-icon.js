class MediaIconComponent extends HTMLElement {
    connectedCallback() {
        this.appendChild(document.createElement("div"));
        this.update();
    }

    update() {
        const d = this.querySelector('div');
        d.setAttribute('class', 'media-icon ' + this.getAttribute('type'));
        d.innerText = this.getAttribute('type');
    }
}

export const registerMediaIconComponent = () => customElements.define('x-media-icon', MediaIconComponent);
