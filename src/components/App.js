import "./App.css";
import styled from "styled-components";
import React from "react";
import Slider from "./Slider";

class App extends React.Component {
  render() {
    return (
      <Main className="App">
        <Title>Okres</Title>
        <Slider />
        <Title>Kwota</Title>
        <Slider />
      </Main>
    );
  }
}

export default App;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 32px;
`;
