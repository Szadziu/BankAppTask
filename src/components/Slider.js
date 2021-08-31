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
  draggableWidth = 50;
  startPosition = 0;
  sliderWidth = 570;

  componentDidMount() {
    const {
      state: { value },
      props: { handleLoan },
    } = this;
    handleLoan(value);
  }

  componentDidUpdate(_, prevState) {
    const {
      state: { value },
      props: { handleLoan },
    } = this;
    if (prevState.value !== value) {
      handleLoan(value);
    }
  }

  startDrag = (e) => {
    e.preventDefault();
    const { drag, stopDrag } = this;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };

  stopDrag = () => {
    const { drag, stopDrag } = this;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
  };

  progressDrag = (width, mouseX) => {
    const {
      props: { max, min },
      draggableWidth,
    } = this;
    const step = (width - draggableWidth) / (max - min);
    const newValue = Math.round((mouseX - draggableWidth / 2) / step) + min;
    this.setState({ value: newValue });
  };

  drag = (e) => {
    const { draggableWidth, sliderRef, startPosition, progressDrag } = this;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const positionMouse = mouseX - draggableWidth / 2;

    if (mouseX - draggableWidth / 2 < 0) {
      this.setState({ position: startPosition });
      return;
    }
    if (mouseX + draggableWidth / 2 > width) {
      this.setState({ position: width - draggableWidth });
      return;
    }

    progressDrag(width, mouseX);
    this.setState({ position: positionMouse });
  };

  handleMouseMove = (e) => {
    const {
      state: { position },
      sliderRef,
    } = this;
    const { left } = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const clickedPosition = mouseX - position;

    this.setState({
      opacityBarWidth: clickedPosition,
      isOpacityBar: true,
    });
  };

  handleClick = (e) => {
    this.drag(e);
    this.setState((prevState) => ({
      isOpacityBar: !prevState.isOpacityBar,
    }));
  };

  handleChange = (e) => {
    const {
      startPosition,
      sliderWidth,
      props: { min, max },
    } = this;
    const value = e.target.value;
    if (value <= max && value >= min) {
      this.setState({
        value: value * 1,
        position: (((value * 100) / max) * sliderWidth) / 100,
      });
    } else if (value >= max) {
      this.setState({
        value: max,
        position: sliderWidth,
      });
    } else if (value <= min) {
      this.setState({
        value: min,
        position: startPosition,
      });
    }
  };

  render() {
    const {
      sliderRef,
      sliderWidth,
      startDrag,
      handleClick,
      handleChange,
      handleMouseMove,
      state: { opacityBarWidth, isOpacityBar, value, position },
      props: { title, handleLoan, min, max, sign },
    } = this;

    return (
      <Wrapper>
        <Title>{title}</Title>
        <MainBar
          opacityWidth={opacityBarWidth}
          width={sliderWidth}
          position={position}
          ref={sliderRef}
          onClick={(e) => handleClick(e)}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <ProgressBar position={position} />
          {isOpacityBar && <OpacityBar />}
          <Draggable position={position} onMouseDown={startDrag}>
            <FontAwesomeIcon size="xs" icon={faChevronLeft} pull="left" />
            <FontAwesomeIcon size="xs" icon={faChevronRight} />
          </Draggable>
        </MainBar>
        <BoxResult>
          <Result
            min={min}
            max={max}
            handleLoan={handleLoan}
            onChange={(e) => handleChange(e)}
            type="number"
            value={value}
          />
          <Sign>{sign}</Sign>
        </BoxResult>
      </Wrapper>
    );
  }
}

export default Slider;

const Title = styled.p`
  text-align: center;
`;

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

const Wrapper = styled.div`
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
  width: ${(props) => props.position}px;
  height: 100%;

  background: gray;
  border-radius: 20px;
`;

const MainBar = styled.div`
  position: relative;
  top: 10%;
  left: 50%;
  display: flex;
  width: ${(props) => props.width}px;
  height: 10%;

  padding: 1px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 1px 1px lightgray;
  transform: translate(-50%, -50%);
  cursor: pointer;

  &:hover ${OpacityBar} {
    width: ${(props) => props.opacityWidth}px;
    background-color: grey;
  }
`;

const Draggable = styled.div`
  position: absolute;
  top: -20px;
  left: ${(props) => props.position}px;
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
