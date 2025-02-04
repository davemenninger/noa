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

            const i4 = document.createElement('li');
            i4.append(this.getAttribute('date'));

            const i5 = document.createElement('li');
            i5.append(this.getAttribute('released'));

            i.appendChild(c);
            u.appendChild(i);

            i2.appendChild(s);

            u.appendChild(i2);
            u.appendChild(i3);
            u.appendChild(i4);
            u.appendChild(i5);

            d.appendChild(u);
        }
    }
}

export const registerWorkComponent = () => customElements.define('x-work', WorkComponent);
