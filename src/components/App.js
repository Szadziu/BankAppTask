import "./App.css";
import styled from "styled-components";
import React from "react";
import Slider from "./Slider";

class App extends React.Component {
  state = {
    loanPeriod: 1,
    loanAmount: 0,
  };

  handleLoanAmount = (dataValue) => {
    this.setState({ loanAmount: dataValue });
  };

  handleLoanPeriod = (dataValue) => {
    this.setState({ loanPeriod: dataValue });
  };
  render() {
    const { loanAmount, loanPeriod } = this.state;
    const loanInstallment = (loanAmount / loanPeriod).toFixed(2);
    return (
      <>
        <Container>
          <Slider
            text={"Okres"}
            handleLoan={this.handleLoanPeriod}
            min={3}
            max={120}
          />
          <Slider
            text={"Kwota"}
            handleLoan={this.handleLoanAmount}
            min={500}
            max={100000}
          />
        </Container>
        <InterestRate>
          <label htmlFor="title">Oprocentowanie</label>
          <input name="title" id="title" type="text" />
          <input type="checkbox" />
          <PercentageSign>%</PercentageSign>
          <LoanInstallment>
            Rata kredytu: {loanInstallment ? loanInstallment : "0"} zł
          </LoanInstallment>
        </InterestRate>
      </>
    );
  }
}

export default App;

const InterestRate = styled.div`
  display: flex;
  position: absolute;
  top: 85%;
  left: 30%;
`;

const PercentageSign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 25px;
  background-color: lightgrey;
  border-radius: 5px;
  margin: 0 10px;
`;

const LoanInstallment = styled.div`
  background-color: orange;
  width: 100px;
  height: 100px;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid orange;
  border-radius: 20px;
  width: 50vw;
  height: 60vh;
`;
