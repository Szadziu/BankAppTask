import "./App.css";
import styled from "styled-components";
import React from "react";
import Slider from "./Slider";

class App extends React.Component {
  state = {
    position: 0,
  };

  render() {
    return (
      <Main>
        <Slider min={3} max={120} />
        {/* <Slider min={500} max={100000} /> */}
      </Main>
    );
  }
}

export default App;

const Main = styled.div`
  font-size: 32px;
`;
