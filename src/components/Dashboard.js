import React, { useState } from "react";
import Axios from "axios";
import "./Dashboard.css";
import moment from "moment";

function Dashboard(props) {
  const port = process.env.PORT || 3001;
  const [urllist, setUrlList] = useState([]);
  const [searchurl, setSearchUrl] = useState("");

  if (!searchurl) {
    Axios.get(`http://localhost:${port}/geturllist`)
      .then((response) => {
        setUrlList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getSearchUrl = (evt) => {
    evt.preventDefault();

    Axios.post(`http://localhost:${port}/geturl`, {
      searchurl: searchurl,
    }).then((response) => {
      setUrlList(response.data);
    });
  };

  return (
    <div className="container">
      <h1>List of URL Recoard</h1>
      <div className="dashboard">
        <form action="" className="row g-3">
          <div className="col-auto">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Search Shortcode Url"
              onChange={(event) => {
                setSearchUrl(event.target.value);
              }}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary mb-3" onClick={getSearchUrl}>
              Search Shortcode
            </button>
          </div>
        </form>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Url</th>
              <th scope="col">Shortcode</th>
              <th scope="col">Expire Date</th>
              <th scope="col">Couter</th>
            </tr>
          </thead>
          <tbody>
            {urllist.map((val, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{val.id}</th>
                  <td>{val.fullurl.substring(0, 100) + "..."}</td>
                  <td>{val.shortcode}</td>
                  <td>{moment(val.expiredate).format("LL")}</td>
                  <td>{val.numofhits}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
