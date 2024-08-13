import css from "./SearchBox.module.css"

function SearchBox({ value, onSearch }) {
  return (
    <div className={css.searchContainer}>
      <label className={css.searchLabel}>
        <span>Find contacts by name</span>
        <br />
        <input
          type="text"
          name="searchField"
          value={value}
          onChange={onSearch}
        />
      </label>
    </div>
  );
}

export default SearchBox;
