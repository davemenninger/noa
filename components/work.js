class WorkComponent extends HTMLElement {
    connectedCallback() {
        this.appendChild(document.createElement("div"));
        this.update();
    }

    update() {
        const d = this.querySelector('div');
        d.setAttribute('class', 'work');
        if(d){
            d.innerText = this.getAttribute('title');
            d.innerText += " " + this.getAttribute('date');

            var b = document.createElement('x-watched-button');
            b.setAttribute('id', this.getAttribute('id'));

            var i = document.createElement('x-media-icon');
            i.setAttribute('type', this.getAttribute('media_type'));

            d.appendChild(i);
            d.appendChild(b);

        }
    }
}

export const registerWorkComponent= () => customElements.define('x-work', WorkComponent);
