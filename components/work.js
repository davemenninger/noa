class WorkComponent extends HTMLElement {
    connectedCallback() {
        this.appendChild(document.createElement("div"));
        this.update();
    }

    update() {
        const d = this.querySelector('div');
        if(d){
            d.setAttribute('class', 'work');
            const u = document.createElement('ul');

            const i = document.createElement('li');
            const c = document.createElement('x-watched-checkbox');
            c.setAttribute('id', this.getAttribute('id'));


            const i2 = document.createElement('li');
            const s = document.createElement('x-media-icon');
            s.setAttribute('type', this.getAttribute('media_type'));

            const i3 = document.createElement('li');
            i3.append(this.getAttribute('title'));


            i.appendChild(c);
            u.appendChild(i);

            i2.appendChild(s);
            u.appendChild(i2);

            u.appendChild(i3);

            d.appendChild(u);
        }
    }
}

export const registerWorkComponent = () => customElements.define('x-work', WorkComponent);
