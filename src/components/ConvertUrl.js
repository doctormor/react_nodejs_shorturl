import React, { useState } from "react";
import "./ConvertUrl.css";
import Axios from "axios";
import validator from "validator";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ConvertUrl() {
  const port = process.env.PORT || 3001;
  const baseurl = "http://localhost:3000";
  const [urllist, setUrlList] = useState([]);
  const [fullurl, setFullurl] = useState("");
  const [savesuccess, setSaveSuccess] = useState(false);
  const [savefail, setSaveFail] = useState(false);
  const [txtSuccess, setTxtSuccess] = useState("");
  const [txtFail, setTxtFail] = useState("");

  const createShortUrl = (evt) => {
    evt.preventDefault();

    if (validator.isURL(fullurl)) {
      Axios.post(`http://localhost:${port}/create`, {
        fullurl: fullurl,
      }).then((response) => {
        setUrlList([
          ...urllist,
          {
            fullurl: fullurl.substring(0, 100) + "...",
            shortcode: baseurl + "/su/" + response.data,
          },
        ]);
      });

      setFullurl("");
      setSaveSuccess(true);
      setTxtSuccess("Is Valid URL");
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    } else {
      setSaveFail(true);
      setTxtFail("Is Not Valid URL");
      setTimeout(() => {
        setSaveFail(false);
      }, 2000);
    }
  };

  return (
    <div className="container">
      <h1>URL SHORTENER</h1>
      <div className="information">
        <form action="" className="row g-2">
          <div className="col">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Password
            </label>
            <input
              type="text"
              name="fullurl"
              className="form-control form-control-lg"
              placeholder="Shorten your link"
              value={fullurl}
              onChange={(event) => {
                setFullurl(event.target.value);
              }}
            />
          </div>
          {savesuccess && (
            <div className="alert alert-success" role="alert">
              {txtSuccess}
            </div>
          )}
          {savefail && (
            <div className="alert alert-danger" role="alert">
              {txtFail}
            </div>
          )}
          <br />
          <div className="showurl d-grid gap-2">
            <button
              className="btn btn-primary btn-lg mb-3"
              onClick={createShortUrl}
            >
              Shorten
            </button>
          </div>
        </form>
        <ul className="list-group">
          {urllist.map((val, key) => {
            return (
              <li
                key={key}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="row">
                  <div className="col-8 text-start overflow-hidden">
                    {val.fullurl}
                  </div>

                  <div className="col">{val.shortcode}</div>
                  <div className="col-1">
                    <CopyToClipboard text={val.shortcode}>
                      <button className="btn btn-outline-primary">Copy</button>
                    </CopyToClipboard>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ConvertUrl;
