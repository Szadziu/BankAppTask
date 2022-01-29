import React from 'react';
import styled from 'styled-components';
import Slider from './Slider';
import Suwak from './Suwak';

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
          {/* <Suwak text='suwak' value={0} /> */}
        </Panel>

        <InterestRatePanel>
          <Label htmlFor='title'>Oprocentowanie</Label>

          <InterestInput
            onChange={(e) => handleEdgeInterestRate(e)}
            name='title'
            id='title'
            type='number'
            disabled={!isChecked}
            value={isChecked && interest}
          />
          <UnitOfInterest>%</UnitOfInterest>
          <CheckboxTemplate>
            <InterestCheckbox
              onChange={(e) => handleCheckbox(e)}
              checked={isChecked}
              type='checkbox'
            />

            <CheckboxLabel
              className={isChecked ? 'isChecked' : 'isUnchecked'}
            ></CheckboxLabel>
          </CheckboxTemplate>

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
// kontener całej aplikacji
const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

// panel z suwakami
const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 50%;
  /* transform: translate(-50%, -50%); */
  border: 2px solid #fa863f;
  border-radius: 20px;

  font-family: 'Cormorant SC', serif;
`;

// panel oprocentowania
const InterestRatePanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10%;
  width: 90%;
  height: 40%;

  font-family: 'Cormorant SC', serif;
`;

// tytuł oprocentowanie
const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 10%;
  border-radius: 20px;
  box-shadow: 0 0 10px 3px #777;

  font-size: 1rem;
  text-transform: uppercase;
`;

// wl/wyl suwak do oprocentowania
const CheckboxTemplate = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 15%;
  height: 5%;
  border-radius: 5px;

  background: #444;
`;
// kropka od suwaka oprocentowania
const CheckboxLabel = styled.label`
  position: absolute;
  left: -10%;

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
`;
// ukryty checkbox
const InterestCheckbox = styled.input`
  position: relative;
  z-index: 1;

  width: 100%;
  height: 100%;
  opacity: 0;

  cursor: pointer;

  &:checked + label {
    left: calc(110% - 20px);

    transform: rotate(225deg);
    box-shadow: 0 0 5px 2px green;
  }
`;
// input oprocentowania
const InterestInput = styled.input`
  width: 10%;
  height: 10%;
  border: none;
  box-shadow: 0 0 5px 2px #777;
  border-radius: 20%;

  text-align: center;
  font-size: 1rem;

  transition: 0.4s;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:disabled {
    color: #666;
    background-color: #666;
  }
`;

// kontener ze znakiem %
const UnitOfInterest = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 10%;
  box-shadow: 0 0 5px 2px #777;
  border-radius: 20px;

  font-size: 1.5rem;
`;
// kontener na ratę kredytu
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
`;
