import { useState } from "react";

export default function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    onSubmit(search);
    setSearch("");
  }

  return (
    <form
      onSubmit={handleSearch}
      className="form d-flex justify-content-center search-container"
    >
      <input
        onChange={(event) => setSearch(event.target.value)}
        type="text"
        className="form-control custom-w rounded-pill search-input"
        placeholder="Search..."
        value={search}
      />
      <button type="submit" className="search-button">
        <i className="bi bi-search dark-1 "></i>
      </button>
    </form>
  );
}
