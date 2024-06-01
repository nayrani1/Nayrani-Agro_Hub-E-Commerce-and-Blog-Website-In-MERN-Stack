import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({searchForm, searchBox, searchBtn, btnData}) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchContrl = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/products/${keyword}`);
    }
  };

  return (
      <form className={searchForm} onSubmit={searchContrl}>
        <input
          className={searchBox}
          type="text"
          placeholder="search items...."
          id="search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className={searchBtn} type="submit">
         {btnData}
        </button>
      </form>
  );
};

export default Search;
