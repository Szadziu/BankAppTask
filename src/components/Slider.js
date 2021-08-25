import styled from "styled-components";

const Slider = () => {
  return (
    <Axis>
      <Point>{"< >"}</Point>
    </Axis>
  );
};

export default Slider;

const Axis = styled.div`
  width: 200px;
  height: 10px;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 5px;
`;

const Point = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 2px 3px black;
  background-color: orange;
  font-weight: bold;
  transform: translate(-50%, calc(-50% + 5px));
`;
