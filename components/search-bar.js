class SearchBarComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <form>
                <label for="query">Q:</label>
                <input type="text" id="query" name="query" />
                <button type="submit">Search</button>
            </form>
        `;

    this.querySelector("form").onsubmit = (e) => {
      var q = e.target["0"].value;
      console.log(q);
      e.preventDefault();

      var db = document.getElementById("db");
      var results = document.getElementById("results");
      try {
        results.innerHTML = "";
        var sql = "select * from media where title like '%" + q + "%' limit 9";
        console.log(sql);
        db.query(sql, results);
      } catch (e) {
        console.log(e);
      }
    };
  }
}

export const registerSearchBarComponent = () =>
  customElements.define("x-search-bar", SearchBarComponent);
