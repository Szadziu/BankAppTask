import React from 'react';
import styled from 'styled-components';
import Slider from './Slider';

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
      <MainWrapper>
        <Panel>
          <Slider
            sign={'M'}
            title={'Okres'}
            handleLoan={handleLoanPeriod}
            min={3}
            max={120}
          />

          <Slider
            sign={'PLN'}
            title={'Kwota'}
            handleLoan={handleLoanAmount}
            min={500}
            max={100000}
          />
        </Panel>

        <InterestRatePanel>
          <Label htmlFor='title'>
            Oprocentowanie
            <CheckboxTemplate checked={isChecked}>
              <InterestCheckbox
                onChange={(e) => handleCheckbox(e)}
                checked={isChecked}
                type='checkbox'
              />

              <CheckboxLabel
                className={isChecked ? 'isChecked' : 'isUnchecked'}
              ></CheckboxLabel>
            </CheckboxTemplate>
          </Label>

          <InterestInput
            onChange={(e) => handleEdgeInterestRate(e)}
            name='title'
            id='title'
            type='number'
            disabled={!isChecked}
            value={isChecked && interest}
          />
          <UnitOfInterest checked={isChecked}>%</UnitOfInterest>

          {isChecked ? (
            <LoanInstallment>
              Rata kredytu:{' '}
              {loanInstallment
                ? (
                    loanInstallment +
                    loanInstallment * (interest / 100)
                  ).toFixed(2)
                : '0'}
              zł
            </LoanInstallment>
          ) : (
            <LoanInstallment>
              Rata kredytu: {loanInstallment ? loanInstallment.toFixed(2) : '0'}
              zł
            </LoanInstallment>
          )}
        </InterestRatePanel>
      </MainWrapper>
    );
  }
}

export default App;
const MainWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 1600px;
  height: 100vh;
  box-sizing: border-box;
  border: 2px solid black;

  @media (min-width: 1366px) {
    flex-direction: column;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 50%;
  padding-bottom: 20px;
  border: 2px solid #fa863f;
  border-radius: 20px;

  color: #444;

  font-family: 'Cormorant SC', serif;

  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 1366px) {
    width: 40%;
    height: 80%;
  }

  @media (min-width: 3840px) {
    height: 60%;
    justify-content: space-around;
  }
`;

const InterestRatePanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10%;
  width: 90%;
  height: 40%;

  font-family: 'Cormorant SC', serif;

  @media (min-width: 1366px) {
    width: 40%;
    height: 80%;
  }

  @media (min-width: 3840px) {
    height: 60%;
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 40px;
  border-radius: 20px;
  box-shadow: 0 0 10px 3px #777;

  color: #444;

  font-size: 1rem;
  text-transform: uppercase;

  @media (min-width: 768px) {
    width: 60%;
    height: 60px;
    font-size: 1.2rem;
  }
  @media (min-width: 1366px) {
    width: 70%;
    margin: 0 10%;
  }
  @media (min-width: 1920px) {
    width: 80%;
    font-size: 2rem;
  }
  @media (min-width: 3840px) {
    padding-right: 10px;
  }
`;

const CheckboxTemplate = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 40px;
  height: 10px;
  border-radius: 5px;

  background: ${({ checked }) => (checked ? '#999' : '#444')};
`;

const CheckboxLabel = styled.label`
  position: absolute;
  left: -10px;

  display: block;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  transform: rotate(45deg);
  box-shadow: 0 0 5px 2px red;

  background: #fff;

  cursor: pointer;
  transition: all 0.5s ease;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: #444;
    border-radius: 20%;
  }
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
  @media (min-width: 1366px) {
    width: 25px;
    height: 25px;
  }
  @media (min-width: 3840px) {
    width: 35px;
    height: 35px;
  }
`;

const InterestCheckbox = styled.input`
  position: relative;
  z-index: 1;

  width: 100%;
  height: 100%;
  opacity: 0;

  cursor: pointer;

  &:checked + label {
    left: calc(100% - 10px);

    transform: rotate(225deg);
    box-shadow: 0 0 5px 2px green;
  }

  &:checked div {
    background-color: #444;
  }
`;

const InterestInput = styled.input`
  width: 50px;
  height: 30px;
  border: none;
  box-shadow: 0 0 5px 2px #777;
  border-radius: 5px;

  font-size: 1rem;
  text-align: center;

  transition: 0.4s;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:disabled {
    opacity: 0;
  }
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
  @media (min-width: 1920px) {
    height: 50px;
    font-size: 1.9rem;
  }
  @media (min-width: 3840px) {
    font-size: 2.4rem;
  }
`;

const UnitOfInterest = styled.div`
  display: flex;
  opacity: ${({ checked }) => checked || 0};
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  box-shadow: 0 0 5px 2px #777;
  border-radius: 5px;
  padding-bottom: 5px;

  font-size: 1.4rem;

  transition: 0.4s;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
  @media (min-width: 1920px) {
    height: 45px;
    font-size: 2.3rem;
  }
  @media (min-width: 3840px) {
    font-size: 3rem;
  }
`;

const LoanInstallment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 40%;
  padding: 15px;
  box-shadow: 0 0 7px 4px #8c4b23;
  border-radius: 20px;

  background-color: #fa863f;
  color: #444;

  text-align: center;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.9rem;
  }
  @media (min-width: 1366px) {
    font-size: 2.2rem;
  }
  @media (min-width: 1920px) {
    font-size: 2.8rem;
  }
  @media (min-width: 3840px) {
    width: 100%;
    height: 50%;

    font-size: 4.5rem;
  }
`;
