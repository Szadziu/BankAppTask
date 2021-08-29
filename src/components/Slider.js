import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

class Slider extends React.Component {
  state = {
    position: 0,
    value: this.props.min,
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
        <p style={{ textAlign: "center" }}>{this.props.text}</p>
        <MainBar
          handleLoan={this.props.handleLoan}
          width={this.state.opacityBarWidth}
          position={this.state.position}
          ref={this.sliderRef}
          onClick={(e) => {
            this.drag(e);
            this.props.handleLoan(this.state.value);
          }}
          onMouseMove={(e) => {
            const slider = this.sliderRef.current;
            const { left } = slider.getBoundingClientRect();
            const mouseX = e.clientX - left;
            const clickedPosition = mouseX - this.state.position - 15;

            this.setState({
              opacityBarWidth: clickedPosition,
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
          >
            <FontAwesomeIcon size="xs" icon={faChevronLeft} pull="left" />
            <FontAwesomeIcon size="xs" icon={faChevronRight} />
          </Draggable>
        </MainBar>
        <Result
          min={this.props.min}
          max={this.props.max}
          handleLoan={this.props.handleLoan}
          onChange={(e) => {
            if (
              e.target.value <= this.props.max &&
              e.target.value >= this.props.min
            ) {
              this.setState({
                value: e.target.value * 1,
                position:
                  (((e.target.value * 100) / this.props.max) * 570) / 100,
              });
            } else if (e.target.value >= this.props.max) {
              this.setState({
                value: this.props.max,
                position: 570,
              });
            } else if (e.target.value <= this.props.min) {
              this.setState({
                value: this.props.min,
                position: 0,
              });
            }
          }}
          type="number"
          value={this.state.value}
        />
        <Sign>{this.props.sign}</Sign>
      </Main>
    );
  }
}

export default Slider;

const Sign = styled.div`
  position: absolute;
  top: 71%;
  left: 80%;
  height: 30px;
  width: auto;
  padding: 0 10px;
  text-align: center;
  line-height: 30px;
  color: black;
  font-size: 16px;
  border-radius: 10px;
  background-color: grey;
`;

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  font-size: 24px;
`;

const Result = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 15%;
  background-color: lightgray;
  border: none;
  border-radius: 20px;
  color: white;
  &:focus {
    border: 1px solid orange;
    border-radius: 20px;
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const OpacityBar = styled.div`
  background-color: lightgrey;
  height: 100%;
  width: ${(props) => props.width}px;
  border-radius: 20px;
  opacity: 0.5;
`;

const ProgressBar = styled.div`
  width: 0;
  height: 100%;

  border-radius: 20px;

  background: gray;
  &:hover {
    cursor: pointer;
  }
`;

const MainBar = styled.div`
  position: relative;
  display: flex;

  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620px;
  height: 10%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 1px 1px lightgray;
  padding: 1px;

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
  box-shadow: 0 0 4px 0 black;

  font-size: 2rem;
  font-family: "Arial";

  background: orange;
  color: white;

  cursor: grab;
`;
