class MediaIconComponent extends HTMLElement {
    connectedCallback() {
        this.appendChild(document.createElement("div"));
        this.update();
    }

    update() {
        const d = this.querySelector('div');
        d.setAttribute('class', 'media-icon ' + this.getAttribute('type'));
        const icon = document.createElement("img");
        const type = this.getAttribute('type');
        switch(type){
            case 'C':
                icon.setAttribute('src', './components/pencil-svgrepo-com.svg');
                break;
            case 'F':
                icon.setAttribute('src', './components/movie-recorder-svgrepo-com.svg');
                break;
            case 'N':
                icon.setAttribute('src', './components/book-album-svgrepo-com.svg');
                break;
            case 'SS':
                icon.setAttribute('src', './components/note-text-svgrepo-com.svg');
                break;
            case 'TV':
                icon.setAttribute('src', './components/tv-television-svgrepo-com.svg');
                break;
            case 'VG':
                icon.setAttribute('src', './components/joystick-svgrepo-com.svg');
                break;
            case 'YR':
                icon.setAttribute('src', './components/book-album-svgrepo-com.svg');
                break;
            default:
                console.log('icon for type ' + type + ' not implemented');
        }

        icon.setAttribute('width', 24);
        d.appendChild(icon);
        d.append(" " + type);
    }
}

export const registerMediaIconComponent = () => customElements.define('x-media-icon', MediaIconComponent);
