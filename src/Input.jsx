import React, { useState } from "react";
import "./Input.css";

const Input = () => {
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const [_copy, set_Copy] = useState("Copy");

  const server = "https://nano-url.azurewebsites.net/";

  const handleClick = (e) => {
    
    setKey('');
    fetch(server, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ url }),
    }).then(res => res.json())
      .then( obj => {
        let _key = obj.data;
        setKey(_key);
      })
      .catch(function (res) {
        console.log(res);
      });

    set_Copy("Copy");
  };

  const handleChange = (e) => {
    setUrl(() => e.target.value);
  };

  const copyToBoard = async (url) => {
    await navigator.clipboard.writeText(url);
    set_Copy("Copied \u2713");
  };

  // let short = key?server+key:null;

  return (
    <>
      <h4>Enter URL to create shortcut -</h4>
      <input
        id="input"
        type="text"
        placeholder="https://google.com/"
        onChange={handleChange}
        value={url}
      />
      <button type="button" className="btn" onClick={handleClick}>
        Get nano-url
      </button>
      {key?.length===8 && <div className="output">
        <a href={server+key} target="_blank" rel="noreferrer">{server+key}</a>
        <button id="copy-btn" className="btn" onClick={() => copyToBoard(server+key)}>{_copy}</button>
      </div>}
    </>
  );
};

export default Input;
