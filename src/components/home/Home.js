import React from "react";
import RootStore from "../../store";

const Home = () => {
  const checkPlayer = (val) =>{
    console.log(val)
  }
  return (<div className="chosePlayer">
    <button onClick={() => checkPlayer(1)}>start 1 player
    </button>
    <button onClick={() => checkPlayer(2)}>start 2 player
    </button>
  </div>)
}
export default Home