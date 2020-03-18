import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./app.css";

const useGiphy = query => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const API_KEY = process.env.API_KEY;
        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=24&offset=0&rating=G&lang=en`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setResult(
          data.data.map(g => ({
            id: g.id,
            title: g.title,
            url: g.url,
            mp4: g.images.original_mp4.mp4
          }))
        );
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [query]);

  return [result, loading];
};

const App = () => {
  const [search, setSearch] = useState("good");
  const [query, setQuery] = useState("good");
  const [result, loading] = useGiphy(query);
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
        {loading
          ? "Loading..."
          : result.map(r => (
              <li key={r.id}>
                <a href={r.url} target="_blank">
                  <video src={r.mp4} autoPlay loop></video>
                </a>
              </li>
            ))}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
