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
    isOpacityBar: true,
  };
  sliderRef = React.createRef();

  componentDidMount() {
    this.props.handleLoan(this.state.value);
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;
    if (prevState.value !== value) {
      this.props.handleLoan(value);
    }
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
    const {
      sliderRef,
      startDrag,
      state: { opacityBarWidth, isOpacityBar, value, position },
      props: { title, handleLoan, min, max, sign },
    } = this;

    return (
      <Main>
        <p style={{ textAlign: "center" }}>{title}</p>
        <MainBar
          handleLoan={handleLoan}
          width={opacityBarWidth}
          position={position}
          ref={sliderRef}
          onClick={(e) => {
            this.drag(e);
            this.setState((prevState) => ({
              isOpacityBar: !prevState.isOpacityBar,
            }));
          }}
          onMouseMove={(e) => {
            const slider = sliderRef.current;
            const { left } = slider.getBoundingClientRect();
            const mouseX = e.clientX - left;
            const clickedPosition = mouseX - position - 15;

            this.setState({
              opacityBarWidth: clickedPosition,
              isOpacityBar: true,
            });
          }}
        >
          <ProgressBar style={{ width: position + 20 }}></ProgressBar>
          {isOpacityBar ? <OpacityBar /> : null}
          <Draggable style={{ left: position }} onMouseDown={startDrag}>
            <FontAwesomeIcon size="xs" icon={faChevronLeft} pull="left" />
            <FontAwesomeIcon size="xs" icon={faChevronRight} />
          </Draggable>
        </MainBar>
        <BoxResult>
          <Result
            min={min}
            max={max}
            handleLoan={handleLoan}
            onChange={(e) => {
              if (e.target.value <= max && e.target.value >= min) {
                this.setState({
                  value: e.target.value * 1,
                  position: (((e.target.value * 100) / max) * 570) / 100,
                });
              } else if (e.target.value >= max) {
                this.setState({
                  value: max,
                  position: 570,
                });
              } else if (e.target.value <= min) {
                this.setState({
                  value: min,
                  position: 0,
                });
              }
            }}
            type="number"
            value={value}
          />
          <Sign>{sign}</Sign>
        </BoxResult>
      </Main>
    );
  }
}

export default Slider;

const BoxResult = styled.div`
  position: relative;
  top: 30%;
  left: 50%;
  display: flex;
  align-items: center;
  width: 80%;
  height: 15%;

  padding-left: 10px;
  border: none;

  background-color: lightgray;
  border-radius: 20px;
  color: white;
  transform: translate(-50%, -50%);
`;

const Sign = styled.div`
  position: absolute;
  top: 10%;
  left: calc(99% - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 50px;

  background-color: grey;

  text-align: center;
  color: white;
  font-size: 16px;
  border-radius: 10px;
`;

const Main = styled.div`
  position: relative;
  width: 100%;
  height: 50%;

  font-size: 24px;
`;

const Result = styled.input`
  width: 100%;
  height: 80%;

  border: none;
  outline: none;

  background-color: transparent;
  color: white;
  font-size: 22px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const OpacityBar = styled.div`
  width: ${(props) => props.width}px;
  height: 100%;

  background-color: blue;

  border-radius: 20px;
  opacity: 0.5;
`;

const ProgressBar = styled.div`
  width: 0;
  height: 100%;

  background: gray;

  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const MainBar = styled.div`
  position: relative;
  top: 10%;
  left: 50%;
  display: flex;
  width: 620px;
  height: 10%;

  padding: 1px;

  background-color: white;

  border-radius: 20px;
  box-shadow: 0 0 1px 1px lightgray;
  transform: translate(-50%, -50%);

  &:hover ${OpacityBar} {
    width: ${(props) => props.width}px;
    background-color: grey;
    cursor: pointer;
  }
`;

const Draggable = styled.div`
  position: absolute;
  top: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 60px;
  height: 60px;

  border-radius: 50%;
  box-shadow: 0 0 4px 0 black;

  font-size: 2rem;
  font-family: "Arial";

  background: orange;
  color: white;

  cursor: grab;
`;
