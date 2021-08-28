import styled from "styled-components";
import React from "react";

class Slider extends React.Component {
  state = {
    position: 0,
    value: this.props.min,
  };
  sliderRef = React.createRef();

  componentDidMount() {
    this.props.handleLoan(this.state.value);
  }

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
    const step = (width - 50) / (max - min);
    const newValue = Math.round((mouseX - 25) / step) + min;
    this.setState({ value: newValue });
  };

  drag = (e) => {
    this.props.handleLoan(this.state.value);

    const slider = this.sliderRef.current;
    const { left, width } = slider.getBoundingClientRect();
    const draggableWidth = 50;
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
      <Main>
        <h4 style={{ textAlign: "center" }}>{this.props.text}</h4>
        <MainBar ref={this.sliderRef}>
          <ProgressBar
            style={{ width: this.state.position + 20 }}
          ></ProgressBar>
          <Draggable
            style={{ left: this.state.position }}
            onMouseDown={this.startDrag}
          >
            {"<>"}
          </Draggable>
        </MainBar>
        <Result>{this.state.value}</Result>
      </Main>
    );
  }
}

export default Slider;

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
`;

const Result = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 15%;
  background-color: lightgrey;
  border-radius: 20px;
`;

const MainBar = styled.div`
  position: relative;
  display: flex;

  top: 30%;
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
  top: -2vh;

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
