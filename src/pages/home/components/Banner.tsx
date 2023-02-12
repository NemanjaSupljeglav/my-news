import React from "react";
import "../Home.scss";
function Home() {
  return (
    <div className="wrapper">
      <div className="myNewstTitle">Make MyNews your homepage</div>
      <div className="everyDay">
        Every day discover what’s trending on the internet!
      </div>
      <div className="button">
        <button onClick={() => console.log("GET")} className="getButton">
          GET
        </button>
        <button onClick={() => console.log("No, thanks")} className="noButton">
          No, thanks
        </button>
      </div>
    </div>
  );
}

export default Home;
