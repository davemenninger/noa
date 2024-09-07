class SearchBarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <form>
                <label for="query">Q:</label>
                <input type="text" id="query" name="query" />
                <button type="submit">Search</button>
            </form>
        `;

        this.querySelector('form').onsubmit = (e) => {
            e.preventDefault();
            // stuff...
            console.log(e);
            e.target.reset();
        }
    }
}

export const registerSearchBarComponent = () => customElements.define('x-search-bar', SearchBarComponent);
