import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const DRAGGABLE_WIDTH = 45;
const HALF_DRAGGABLE_WIDTH = 22.5;
const START_POSITION = 0;

const progressDrag = (width, mouseX, min, max) => {
  const step = (width - DRAGGABLE_WIDTH) / (max - min);
  let newValue = Math.floor((mouseX - HALF_DRAGGABLE_WIDTH) / step) + min;

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
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDrag);
  };

  stopDrag = () => {
    const { drag, stopDrag } = this;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', stopDrag);
  };

  drag = (e) => {
    const {
      props: { handleLoan, min, max },
      sliderRef,
    } = this;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const mouseX = (e.clientX ?? e.touches[0].clientX) - left;
    const positionMouse = mouseX - HALF_DRAGGABLE_WIDTH;

    let newValue = progressDrag(width, mouseX, min, max);

    if (positionMouse < 0) {
      this.setState({ position: START_POSITION, value: min });
    } else if (mouseX + HALF_DRAGGABLE_WIDTH > width) {
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
    const { width } = this.sliderRef.current.getBoundingClientRect();
    let value = Number(e.target.value);

    if (value > max) value = max;
    if (value < min) value = min;

    const step = (width - DRAGGABLE_WIDTH) / (max - min + min);
    this.setState({
      value,
      position: step * value,
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

    const opacityWidth = opacityBarWidth - HALF_DRAGGABLE_WIDTH;
    const positionProgressBar = position + HALF_DRAGGABLE_WIDTH;

    return (
      <Wrapper>
        <Title>{title}</Title>
        <MainBar
          opacityWidth={opacityWidth}
          position={position}
          ref={sliderRef}
          onClick={(e) => handleClick(e)}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <ProgressBar position={positionProgressBar} />
          {isOpacityBar && <OpacityBar className='opacityBar' />}
          <Draggable
            width={DRAGGABLE_WIDTH}
            position={position}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
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
    height: 40%;

    font-size: 3.2rem;
  }
`;

const Title = styled.p`
  text-align: center;
  background-color: #fa863f;
`;

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
`;

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
    font-size: 2.6rem;
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
  width: 270px;
  height: 20px;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  box-shadow: 0 0 10px 5px #aaa;

  cursor: pointer;

  &:hover ${OpacityBar} {
    width: ${(props) => props.opacityWidth}px;

    background-color: #777;
  }
`;

const ProgressBar = styled.div.attrs(({ position }) => ({
  style: {
    width: position,
  },
}))`
  height: 100%;
  border-radius: 20px;

  background: lightseagreen;
`;

const Draggable = styled.div.attrs(({ position }) => ({
  style: {
    left: position,
  },
}))`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-shadow: 0 0 4px 0 #000;

  background: #fa863f;
  color: #fff;

  font-size: 1rem;

  cursor: grab;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  @media (min-width: 1920px) {
    font-size: 1.8rem;
  }
  @media (min-width: 3840px) {
    font-size: 2rem;
  }
`;
