import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import * as P from './Slider.parts';

const DRAGGABLE_WIDTH = 45;
const HALF_DRAGGABLE_WIDTH = DRAGGABLE_WIDTH / 2;
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

    startDrag = () => {
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
            <P.Wrapper>
                <P.Title>{title}</P.Title>
                <P.MainBar
                    opacityWidth={opacityWidth}
                    position={position}
                    ref={sliderRef}
                    onClick={(e) => handleClick(e)}
                    onMouseMove={(e) => handleMouseMove(e)}
                >
                    <P.ProgressBar position={positionProgressBar} />
                    {isOpacityBar && <P.OpacityBar className="opacityBar" />}
                    <P.Draggable
                        width={DRAGGABLE_WIDTH}
                        position={position}
                        onMouseDown={startDrag}
                        onTouchStart={startDrag}
                    >
                        <FontAwesomeIcon
                            size="xs"
                            icon={faChevronLeft}
                            pull="left"
                        />
                        <FontAwesomeIcon size="xs" icon={faChevronRight} />
                    </P.Draggable>
                </P.MainBar>
                <P.ResultWrapper>
                    <P.Result
                        min={min}
                        max={max}
                        handleLoan={handleLoan}
                        onChange={(e) => handleChange(e)}
                        type="number"
                        value={value}
                    />
                    <P.Unit>{sign}</P.Unit>
                </P.ResultWrapper>
            </P.Wrapper>
        );
    }
}

export default Slider;
