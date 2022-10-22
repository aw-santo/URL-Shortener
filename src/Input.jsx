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
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify({ url }),
    }).then(res => (res.json()))
      .then(res => {
        setKey(() => res.data);
        console.log(key);
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  const handleChange = (e) => {
    setUrl(() => e.target.value);
  };

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
      <p>{key?server+key:null}</p>
    </>
  );
};

export default Input;
