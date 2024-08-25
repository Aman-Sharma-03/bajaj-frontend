import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jsonIn, setJsonIn] = useState("");
  const [res, setRes] = useState(null);
  const [options, setOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonIn);
      const response = await axios.post(
        "https://bajaj-backend-lac-nu.vercel.app/api",
        parsedInput
      );
      setRes(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from( e.target.selectedOptions, (option) => option.value);
    setOptions(value);
  };

  const renderResponse = () => {
    if (!res) return null;

    const result = {};

    if (options.includes("Numbers")) {
      result.numbers = res.numbers;
    }
    if (options.includes("Alphabets")) {
      result.alphabets = res.alphabets;
    }
    if (options.includes("Highest lowercase alphabet")) {
      result.highest_lowercase_alphabet = res.highest_low;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  };

  useEffect(() => {
    document.title = "21BCE5769";
  }, []);

  return (
    <div className="container">
      <h1>{res ? res.user_id : "API Input"}</h1>
      <input className="input-textarea" value={jsonIn} onChange={(e) => setJsonIn(e.target.value)} placeholder="Enter the JSON here"/>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      {res && (
        <>
          <h1 className="note">Press Ctrl+click to select multiple</h1>
          <select className="multi-select-dropdown" multiple onChange={handleOptionChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>

          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
