import styled from "styled-components";
import React from "react";

class Slider extends React.Component {
  state = {
    position: 0,
    value: this.props.min,
    mousePosition: 0,
    opacityBarWidth: 0,
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
        <MainBar
          width={this.state.opacityBarWidth}
          position={this.state.position}
          ref={this.sliderRef}
          onClick={(e) => {
            this.drag(e);
          }}
          onMouseMove={(e) => {
            const slider = this.sliderRef.current;
            const { left } = slider.getBoundingClientRect();
            const mouseX = e.clientX - left;
            this.setState({
              opacityBarWidth: mouseX - this.state.position - 15,
            });
          }}
        >
          <ProgressBar
            style={{ width: this.state.position + 20 }}
          ></ProgressBar>
          <OpacityBar width={this.state.opacityBarWidth}></OpacityBar>
          <Draggable
            style={{ left: this.state.position }}
            onMouseDown={this.startDrag}
          ></Draggable>
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
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 15%;
  background-color: lightgrey;
  border-radius: 20px;
`;

const OpacityBar = styled.div`
  background-color: skyblue;
  height: 100%;
  width: ${(props) => props.width}px;
  border-radius: 20px;
  opacity: 0.5;
`;

const ProgressBar = styled.div`
  width: 0;
  height: 100%;

  border-radius: 20px;

  background: rgb(53, 230, 37);
`;

const MainBar = styled.div`
  position: relative;
  display: flex;

  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620px;
  height: 10%;
  background-color: skyblue;
  border-radius: 20px;
  box-shadow: 0 0 1px 1px black;

  &:hover ${OpacityBar} {
    width: ${(props) => props.width}px;
    background-color: grey;
    cursor: pointer;
  }
`;

const Draggable = styled.div`
  position: absolute;
  top: -20px;

  height: 60px;
  width: 60px;

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
