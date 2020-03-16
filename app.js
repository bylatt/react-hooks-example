import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./app.css";

const useGiphy = query => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const API_KEY = process.env.API_KEY;
        console.log(API_KEY);
        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=24&offset=0&rating=G&lang=en`;
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        // setResult(data.data.map(g => g.images.original_mp4.mp4));
        setResult(
          data.data.map(g => ({
            id: g.id,
            title: g.title,
            url: g.url,
            mp4: g.images.original_mp4.mp4
          }))
        );
      } catch (e) {
        console.error(e);
      }
    })();
  }, [query]);

  return result;
};

const App = () => {
  const [search, setSearch] = useState("good");
  const [query, setQuery] = useState("good");
  const result = useGiphy(query);
  const onKeywordChange = e => {
    setSearch(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input type="text" value={search} onChange={onKeywordChange} />
        <br />
        <button type="submit" hidden>
          Search
        </button>
      </form>
      <ul>
        {result.map(r => (
          <li key={r.id}>
            <video src={r.mp4} autoPlay loop></video>
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
