import styled from "styled-components";
import React from "react";
import Slider from "./Slider";

class App extends React.Component {
  state = {
    loanPeriod: 3,
    loanAmount: 500,
    isChecked: true,
    interest: 0,
  };

  handleLoanAmount = (dataValue) => {
    this.setState({ loanAmount: dataValue });
  };

  handleLoanPeriod = (dataValue) => {
    this.setState({ loanPeriod: dataValue });
  };

  handleCheckbox = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
  };

  handleEdgeInterestRate = (e) => {
    const targetValue = Number(e.target.value);
    let newValue;

    if (targetValue >= 0 && targetValue <= 12) newValue = targetValue;
    if (targetValue > 12) newValue = 12;
    if (targetValue < 0) newValue = 0;

    this.setState({
      interest: newValue,
    });

    // if (e.target.value >= 0) {
    //   if (e.target.value > 12) {
    //     e.target.value = 12;
    //     this.setState({
    //       interest: 12,
    //     });
    //     return;
    //   }
    //   this.setState({
    //     interest: e.target.value * 1,
    //   });
    // } else {
    //   e.target.value = 0;
    // }
  };

  render() {
    const {
      handleEdgeInterestRate,
      handleLoanPeriod,
      handleLoanAmount,
      handleCheckbox,
      state: { loanAmount, loanPeriod, interest, isChecked },
    } = this;
    const loanInstallment = Math.floor(loanAmount / loanPeriod);
    return (
      <>
        <Panel>
          <Slider
            sign={"M"}
            title={"Okres"}
            handleLoan={(e) => handleLoanPeriod(e.target.value)}
            min={3}
            max={120}
          />

          <Slider
            sign={"PLN"}
            title={"Kwota"}
            handleLoan={(e) => handleLoanAmount(e.target.value)}
            min={500}
            max={100000}
          />
        </Panel>

        <InterestRatePanel>
          <label htmlFor="title">Oprocentowanie</label>

          <InterestInput
            onChange={(e) => handleEdgeInterestRate(e)}
            name="title"
            id="title"
            type="number"
            disabled={!isChecked}
            value={isChecked && interest}
          />

          <CheckboxTemplate>
            <InterestCheckbox
              onChange={(e) => handleCheckbox(e)}
              checked={isChecked}
              type="checkbox"
            />

            <CheckboxLabel
              className={isChecked ? "isChecked" : "isUnchecked"}
            ></CheckboxLabel>
          </CheckboxTemplate>

          <Sign>%</Sign>
          {isChecked ? (
            <LoanInstallment>
              Rata kredytu:{" "}
              {loanInstallment
                ? (
                    loanInstallment +
                    loanInstallment * (interest / 100)
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
        </InterestRatePanel>
      </>
    );
  }
}

export default App;

const CheckboxTemplate = styled.div`
  position: relative;
  width: 40px;
  height: 10px;

  margin: 20px 80px;

  background: #555;
  border-radius: 3px;
`;

const CheckboxLabel = styled.label`
  position: absolute;
  top: -3px;
  left: -3px;
  display: block;
  width: 16px;
  height: 16px;

  background: #ccc;
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.5s ease;
`;

const InterestCheckbox = styled.input`
  position: relative;
  top: -200%;
  left: -30%;
  width: 50px;
  height: 40px;

  opacity: 0;
  cursor: pointer;

  &:checked + label {
    left: 27px;
  }
`;

const InterestInput = styled.input`
  width: 100px;
  height: 20px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InterestRatePanel = styled.div`
  position: absolute;
  display: flex;
  top: 85%;
  left: 30%;
`;

const Sign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 25px;

  margin: 0 10px;

  background-color: lightgrey;
  border-radius: 5px;
`;

const LoanInstallment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;

  padding-left: 5px;

  background-color: orange;
  border-radius: 20px;
`;

const Panel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 60vh;

  border: 2px solid orange;

  border-radius: 20px;
  transform: translate(-50%, -50%);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;
