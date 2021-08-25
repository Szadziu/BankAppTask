import "./App.css";
import styled from "styled-components";
import React from "react";
import Slider from "./Slider";

class App extends React.Component {
  state = {
    position: 0,
  };

  startDrag = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", this.drag);
    document.addEventListener("mouseup", this.stopDrag);
  };

  stopDrag = () => {
    document.removeEventListener("mousemove", this.drag);
    document.removeEventListener("mouseup", this.stopDrag);
  };

  progressDrag = (width, mouseX) => {
    const { max, min } = this.props;
    const step = (width - 160) / (max - min);
    const newValue = Math.round((mouseX - 80) / step) + min;
    this.setState({ value: newValue });
  };

  drag = (e) => {
    const slider = this.sliderRef.current;
    const { left, width } = slider.getBouncingClientRect();
    const draggableWidth = 160;
    const mouseX = e.clientX - left;

    const startPosition = mouseX - draggableWidth / 2;
    if (mouseX - draggableWidth / 2 < 0) {
      this.setState({ position: 0 });
      return;
    }
    if (mouseX + draggableWidth / 2 > width) {
      this.setState({ position: width - draggableWidth });
      return;
    }
    this.progressDrag(width, mouseX);
    this.setState({ position: startPosition });
  };

  render() {
    return (
      <Main ref={this.sliderRef} className="App">
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
