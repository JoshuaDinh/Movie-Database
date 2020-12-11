import React, { useState } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Info from "./components/Info";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  const apiurl = ` http://www.omdbapi.com/?apikey=${API_KEY}`;

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState((prevState) => {
          return { ...prevState, results: results };
        });
      });
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopUp = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopUp = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header>
        <h1> movie database</h1>
      </header>
      <main>
        <Search search={search} handleInput={handleInput} />

        <Results results={state.results} openPopUp={openPopUp} />

        {typeof state.selected.Title != "undefined" ? (
          <Info selected={state.selected} closePopUp={closePopUp} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
