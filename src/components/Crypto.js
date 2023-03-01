import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Crypto = () => {
  const [search, setSearch] = useState("");
  const [cryptos, setCryptos] = useState([]);

  const endpoint =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  const showData = () => {
    axios.get(endpoint).then((res) => {
      console.log(res.data);
      setCryptos(res.data);
    });
  };
  useEffect(() => {
    showData();
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const results = !search
    ? cryptos
    : cryptos.filter(
        (val) =>
          val.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
          val.symbol.toLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <>
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Search a Crypto"
        className="form-control"
      />
      <table className="table table-dark table-hover mt-4">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Price 24h</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.market_cap_rank}</td>
              <td>
                <img
                  src={result.image}
                  alt={result.name}
                  style={{ width: "1.5rem" }}
                  className="img-fluid me-4"
                />
                {result.name}
              </td>
              <td>{result.symbol.toUpperCase()}</td>
              <td>{result.current_price.toFixed(2)}</td>

              <td>
                {result.price_change_percentage_24h < 0 ? (
                  <span className="text-danger">
                    {result.price_change_percentage_24h.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-success">
                    {result.price_change_percentage_24h.toFixed(2)}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Crypto;
