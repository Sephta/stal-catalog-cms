import './App.css';
import React, { useContext, useEffect, useState } from "react";
import LazyFetch from './components/common/requests/LazyFetch';

const App = (props) => {

  const [APITEST, setAPITest] = useState("NULL");

  useEffect(() => {
    LazyFetch({
      type: "get",
      endpoint: "/home",
      onSuccess: (data) => {
        console.debug("SUCCESS - " + JSON.stringify(data));
        setAPITest(JSON.stringify(data))
      },
      onFailure: (err) => {
        console.error("[ERROR] - Failed to retrieve result of api call.")
      },
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {APITEST}
        </p>
        <button 
          onClick={(event) => {
            console.debug("Sending Post...")
            LazyFetch({
            type: "post",
            endpoint: "/api/mongoTest",
            onSuccess: (data) => {console.debug(`[DEBUG] - ${JSON.stringify(data)}`);},
            onFailure: (err) => {console.error(`[ERROR] - ${err}`);},
            })
          }}
        >Send Post</button>
      </header>
    </div>
  );
}

export default App;
