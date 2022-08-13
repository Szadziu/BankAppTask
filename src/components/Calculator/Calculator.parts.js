import styled from 'styled-components';

export const MainWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 10px;
    transform: translate(-50%, -50%);

    min-width: 320px;
    width: 100vw;
    max-width: 1600px;
    height: 100vh;
    box-sizing: border-box;

    @media (min-width: 1366px) {
        flex-direction: column;
    }

    @media (min-width: 1600px) {
        border-left: 1px solid ${({ theme }) => theme.colors.primary};
        border-right: 1px solid ${({ theme }) => theme.colors.primary};
    }
`;

export const Panel = styled.div`
    display: flex;
    flex-direction: column;

    min-width: 300px;
    width: 100%;
    max-width: 768px;
    min-height: 300px;
    height: 60%;

    box-sizing: border-box;
    padding-top: ${({ theme }) => theme.padding.xxl};
    padding-bottom: ${({ theme }) => theme.padding.xl};
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

    @media (min-width: 768px) {
        border: 1px solid ${({ theme }) => theme.colors.primary};
        border-top: none;
    }

    @media (min-width: 1366px) {
        max-width: 50%;
        height: 80%;

        padding: 0;
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
        border-left: none;
    }
`;

export const InterestRatePanel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;

    min-width: 300px;
    width: 100%;
    max-width: 768px;
    min-height: 300px;
    height: 30%;
    box-sizing: border-box;

    @media (min-width: 1366px) {
        height: 80%;
        max-width: 50%;
    }

    @media (min-width: 1600px) {
        border-top: 1px solid ${({ theme }) => theme.colors.primary};
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    }
`;

export const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;

    width: 100%;
    height: 30px;

    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: 300;
    letter-spacing: ${({ theme }) => theme.letterSpacing.m};
    text-transform: uppercase;

    @media (min-width: 1366px) {
        width: 70%;
        font-size: ${({ theme }) => theme.fontSize.m};
    }
`;

export const CheckboxTemplate = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    width: 30px;
    height: 10px;
    border-radius: ${({ theme }) => theme.borderRadius.s};

    background: ${({ checked, theme }) =>
        checked ? theme.colors.accent_1 : theme.colors.secondary};
`;

export const CheckboxLabel = styled.label`
    position: absolute;
    left: -10px;

    display: block;
    width: 20px;
    height: 20px;
    border-radius: ${({ theme }) => theme.borderRadius.s};
    transform: rotate(45deg);
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.colors.disabled};

    background: ${({ theme }) => theme.colors.white};

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
        background-color: ${({ theme }) => theme.colors.secondary};
        border-radius: ${({ theme }) => theme.borderRadius.s};
    }
`;

export const InterestWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 20px;
`;

export const InterestCheckbox = styled.input`
    position: relative;
    z-index: 1;

    width: 100%;
    height: 100%;
    opacity: 0;

    cursor: pointer;

    &:checked + label {
        left: calc(100% - 10px);

        transform: rotate(225deg);
        box-shadow: 0 0 1px 1px ${({ theme }) => theme.colors.enabled};
    }

    &:checked div {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

export const InterestInput = styled.input`
    width: 30px;
    height: 20px;
    border: none;
    outline: none;

    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};

    font-size: ${({ theme }) => theme.fontSize.s};
    text-align: center;
    color: ${({ theme }) => theme.colors.font};

    transition: 0.4s;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    &:disabled {
        opacity: 0;
    }

    @media (min-width: 1366px) {
        font-size: ${({ theme }) => theme.fontSize.m};
    }
`;

export const UnitOfInterest = styled.div`
    display: flex;
    opacity: ${({ checked }) => checked || 0};
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 20px;

    font-size: ${({ theme }) => theme.fontSize.s};

    transition: 0.4s;

    @media (min-width: 1366px) {
        font-size: ${({ theme }) => theme.fontSize.m};
    }
`;

export const LoanInstallment = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 80px;
    height: 60%;
    margin-bottom: ${({ theme }) => theme.margin.xl};
    padding: ${({ theme }) => theme.padding.s} ${({ theme }) => theme.padding.l};

    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xl};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.letterSpacing.m};

    @media (min-width: 1366px) {
        align-self: flex-end;
        height: calc(50% - 10px);
        margin-bottom: 0;
        font-size: ${({ theme }) => theme.fontSize.xxl};
    }
`;
