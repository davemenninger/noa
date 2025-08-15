class SearchBarComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <form>
                <label for="query">Q:</label>
                <input type="text" id="query" name="query" />
                <input type="text" id="bby" name="bby" />
                <button type="submit">Search</button>
            </form>
        `;

    this.querySelector("form").onsubmit = (e) => {
      var q = e.target["0"].value;
      var bby = e.target["1"].value;
      console.log(q);
      console.log(bby);
      e.preventDefault();

      var db = document.getElementById("db");
      var results = document.getElementById("results");
      try {
        results.innerHTML = "";
        var sql = "select * from media where title like '%" + q + "%' and date like '"+bby+"%' limit 39";
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
