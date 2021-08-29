import "./App.css";
import styled from "styled-components";
import React from "react";
import Slider from "./Slider";

class App extends React.Component {
  state = {
    loanPeriod: 1,
    loanAmount: 0,
    isChecked: false,
    interest: 0,
  };

  handleLoanAmount = (dataValue) => {
    this.setState({ loanAmount: dataValue });
  };

  handleLoanPeriod = (dataValue) => {
    this.setState({ loanPeriod: dataValue });
  };
  render() {
    const { loanAmount, loanPeriod } = this.state;
    const loanInstallment = Math.round(loanAmount / loanPeriod);
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
            max={20000}
          />
        </Container>
        <InterestRate>
          <label htmlFor="title">Oprocentowanie</label>
          <input
            onChange={(e) => {
              if (e.target.value >= 0) {
                if (e.target.value > 12) {
                  e.target.value = 12;
                  this.setState({
                    interest: 12,
                  });
                  return;
                }
                this.setState({
                  interest: e.target.value * 1,
                });
              } else {
                e.target.value = 0;
              }
            }}
            name="title"
            id="title"
            type="number"
            disabled={!this.state.isChecked}
            value={this.state.isChecked && this.state.interest}
          />
          <input
            onChange={() => {
              this.setState((prevState) => ({
                isChecked: !prevState.isChecked,
              }));
            }}
            checked={this.state.isChecked}
            type="checkbox"
          />
          <PercentageSign>%</PercentageSign>
          {this.state.isChecked ? (
            <LoanInstallment>
              Rata kredytu:{" "}
              {loanInstallment
                ? (
                    loanInstallment +
                    loanInstallment * (this.state.interest / 100)
                  ).toFixed(2)
                : "0"}
              zł
            </LoanInstallment>
          ) : (
            <LoanInstallment>
              Rata kredytu: {loanInstallment ? loanInstallment.toFixed(2) : "0"}
              zł
            </LoanInstallment>
          )}
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
