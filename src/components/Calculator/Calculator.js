import React from 'react';
import Slider from '../Slider/Slider';
import * as P from './Calculator.parts';

class Calculator extends React.Component {
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
            <P.MainWrapper>
                <P.Panel>
                    <Slider
                        sign={'MSC'}
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
                </P.Panel>

                <P.InterestRatePanel>
                    <P.Label htmlFor="title">
                        Oprocentowanie
                        <P.CheckboxTemplate checked={isChecked}>
                            <P.InterestCheckbox
                                onChange={(e) => handleCheckbox(e)}
                                checked={isChecked}
                                type="checkbox"
                            />

                            <P.CheckboxLabel
                                className={
                                    isChecked ? 'isChecked' : 'isUnchecked'
                                }
                            ></P.CheckboxLabel>
                        </P.CheckboxTemplate>
                    </P.Label>
                    <P.InterestWrapper>
                        <P.InterestInput
                            onChange={(e) => handleEdgeInterestRate(e)}
                            name="title"
                            id="title"
                            type="number"
                            disabled={!isChecked}
                            value={isChecked && interest}
                        />
                        <P.UnitOfInterest checked={isChecked}>
                            %
                        </P.UnitOfInterest>
                    </P.InterestWrapper>

                    {isChecked ? (
                        <P.LoanInstallment>
                            Rata kredytu
                            <br />
                            {`${
                                loanInstallment
                                    ? (
                                          loanInstallment +
                                          loanInstallment * (interest / 100)
                                      ).toFixed(2)
                                    : '0'
                            } PLN`}
                        </P.LoanInstallment>
                    ) : (
                        <P.LoanInstallment>
                            Rata kredytu
                            <br />
                            {`${
                                loanInstallment
                                    ? loanInstallment.toFixed(2)
                                    : '0'
                            } PLN`}
                        </P.LoanInstallment>
                    )}
                </P.InterestRatePanel>
            </P.MainWrapper>
        );
    }
}

export default Calculator;
