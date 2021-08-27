import styled from "styled-components";
import React from "react";

class Slider extends React.Component {
  state = {
    position: 0,
    value: 0,
  };
  sliderRef = React.createRef();

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
    const { left, width } = slider.getBoundingClientRect();
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
      <Container>
        <h4 style={{ textAlign: "center" }}>Okres</h4>
        <MainBar ref={this.sliderRef}>
          <ProgressBar
            style={{ width: this.state.position + 20 }}
          ></ProgressBar>
          <Draggable
            style={{ left: this.state.position }}
            onMouseDown={this.startDrag}
          >
            {this.state.value}
          </Draggable>
        </MainBar>
      </Container>
    );
  }
}

export default Slider;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid orange;
  border-radius: 20px;
  width: 50vw;
  height: 60vh;
`;

const MainBar = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 10%;
  background-color: skyblue;
  border-radius: 20px;
  box-shadow: 0 0 1px 1px black;
`;

const Draggable = styled.div`
  position: absolute;
  top: -1vh;

  height: 50px;
  width: 50px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  border: 2px solid black;

  font-size: 2rem;
  font-family: "Arial";

  background: orange;
  color: white;

  cursor: grab;
`;

const ProgressBar = styled.div`
  width: 0;
  height: 100%;

  border-radius: 20px;

  background: rgb(53, 230, 37);
`;
