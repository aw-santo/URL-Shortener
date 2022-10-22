import React, { useState } from "react";
import "./Input.css";

const Input = () => {
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");

  const server = "https://nano-url.azurewebsites.net/";

  const handleClick = (e) => {

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
  };

  const handleChange = (e) => {
    setUrl(() => e.target.value);
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
        get nano-url
      </button>
      {key?.length===8 && <div className="output">
        <p>{server+key}</p>
        <button className="btn" onClick={() => navigator.clipboard.writeText(server+key)}>Copy</button>
      </div>}
      
    </>
  );
};

export default Input;
