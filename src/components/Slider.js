import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const DRAGGABLE_WIDTH = 35;
const SLIDER_WIDTH = 300;
const START_POSITION = 0;

const progressDrag = (width, mouseX, min, max) => {
  const step = (width - DRAGGABLE_WIDTH) / (max - min);
  let newValue = Math.floor((mouseX - DRAGGABLE_WIDTH / 2) / step) + min;

  if (newValue < min) newValue = min;
  else if (newValue > max) newValue = max;

  return newValue;
};

class Slider extends React.Component {
  state = {
    position: 0,
    value: this.props.min,
    opacityBarWidth: 0,
    isOpacityBar: true,
  };
  sliderRef = React.createRef();

  startDrag = (e) => {
    e.preventDefault();
    const { drag, stopDrag } = this;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  };

  stopDrag = () => {
    const { drag, stopDrag } = this;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  };

  drag = (e) => {
    const {
      props: { handleLoan, min, max },
      sliderRef,
    } = this;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const positionMouse = mouseX - DRAGGABLE_WIDTH / 2;

    let newValue = progressDrag(width, mouseX, min, max);

    if (positionMouse < 0) {
      this.setState({ position: START_POSITION, value: min });
    } else if (mouseX + DRAGGABLE_WIDTH / 2 > width) {
      this.setState({
        position: width - DRAGGABLE_WIDTH,
        value: max,
      });
    } else {
      this.setState({ position: positionMouse, value: newValue });
    }

    handleLoan(newValue);
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
    const { min, max, handleLoan } = this.props;
    let value = Number(e.target.value);

    if (value > max) value = max;
    if (value < min) value = min;
    this.setState({
      value,
      position:
        (((value * 100) / max) * (SLIDER_WIDTH - DRAGGABLE_WIDTH)) / 100,
    });
    handleLoan(value);
  };

  render() {
    const {
      sliderRef,
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
          width={SLIDER_WIDTH}
          position={position}
          ref={sliderRef}
          onClick={(e) => handleClick(e)}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <ProgressBar position={position} />
          {isOpacityBar && <OpacityBar />}
          <Draggable
            width={DRAGGABLE_WIDTH}
            position={position}
            onMouseDown={startDrag}
          >
            <FontAwesomeIcon size='xs' icon={faChevronLeft} pull='left' />
            <FontAwesomeIcon size='xs' icon={faChevronRight} />
          </Draggable>
        </MainBar>
        <BoxResult>
          <Result
            min={min}
            max={max}
            handleLoan={handleLoan}
            onChange={(e) => handleChange(e)}
            type='number'
            value={value}
          />
          <Unit>{sign}</Unit>
        </BoxResult>
      </Wrapper>
    );
  }
}

export default Slider;

// container na pojedynczy slider
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50%;

  font-size: 1.3rem;

  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
  @media (min-width: 1920px) {
    font-size: 2.4rem;
  }
  @media (min-width: 3840px) {
    font-size: 4rem;
  }
`;

const Title = styled.p`
  text-align: center;
  background-color: #fa863f;
`;
// container na result i jednostkę
const BoxResult = styled.div`
  position: relative;
  top: 30%;
  left: 50%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 15%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  border: none;
  border-radius: 10px;

  background-color: #444;

  @media (min-width: 3840px) {
    height: 10%;
  }
`;
// jednostka slidera
const Unit = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px #fff;
  border-radius: 5px;
  padding: 0 10px;

  background-color: #777;
  color: #fff;

  font-size: 0.7rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
  @media (min-width: 1920px) {
    font-size: 1.6rem;
  }
  @media (min-width: 3840px) {
    font-size: 2.4rem;
  }
`;
// aktualna wartosc slidera
const Result = styled.input`
  width: 100%;
  height: 80%;
  border: none;
  outline: none;

  background-color: transparent;
  color: #fff;

  font-size: 1rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  @media (min-width: 1920px) {
    font-size: 2.4rem;
  }
  @media (min-width: 3840px) {
    font-size: 3.8rem;
  }
`;

const OpacityBar = styled.div`
  width: ${(props) => props.width}px;
  height: 100%;
  border-radius: 20px;
  opacity: 0.5;
`;

const MainBar = styled.div`
  position: relative;
  top: 10%;
  left: 50%;

  display: flex;
  align-items: center;
  width: ${({ width }) => width}px;
  height: 10%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  box-shadow: 0 0 10px 5px #aaa;

  cursor: pointer;

  &:hover ${OpacityBar} {
    width: ${(props) => props.opacityWidth}px;

    background-color: grey;
  }
  @media (min-width: 768px) {
    height: 15%;
  }
  @media (min-width: 1920px) {
    height: 10%;
  }
`;

const ProgressBar = styled.div`
  width: ${({ position }) => position}px;
  height: 100%;
  border-radius: 20px;

  background: lightseagreen;
`;

const Draggable = styled.div`
  position: absolute;
  top: -12.5%;
  left: ${(props) => props.position}px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  border-radius: 50%;
  box-shadow: 0 0 4px 0 #000;

  background: #fa863f;
  color: #fff;

  font-size: 1rem;

  cursor: grab;

  @media (min-width: 768px) {
    width: ${(props) => props.width + 20}px;
    height: ${(props) => props.width + 20}px;

    font-size: 1.5rem;
  }
  @media (min-width: 1920px) {
    width: ${(props) => props.width + 30}px;
    height: ${(props) => props.width + 30}px;

    font-size: 1.8rem;
  }
  @media (min-width: 3840px) {
    width: ${(props) => props.width + 90}px;
    height: ${(props) => props.width + 90}px;

    font-size: 2.8rem;
  }
`;
