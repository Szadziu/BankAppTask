import styled from "styled-components";

const Slider = () => {
  return (
    <Axis>
      <Point>{"<>"}</Point>
    </Axis>
  );
};

export default Slider;

const Axis = styled.div`
  width: 200px;
  height: 10px;
  border: 1px solid black;
  border-radius: 5px;
`;

const Point = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: orange;
`;
