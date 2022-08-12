import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;

    width: 100%;
    min-height: 150px;
    height: 50%;

    font-size: ${({ theme }) => theme.fontSize.l};
`;

export const Title = styled.p`
    text-align: center;
    padding: ${({ theme }) => theme.padding.s} 0;

    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.letterSpacing.m};

    @media (min-width: 1366px) {
        margin-top: 0;
    }
`;

export const ResultWrapper = styled.div`
    position: relative;
    top: 30%;
    left: 50%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 250px;
    height: 30px;
    transform: translate(-50%, -50%);

    padding: 0 ${({ theme }) => theme.padding.m};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const Unit = styled.span`
    position: absolute;

    border-radius: ${({ theme }) => theme.borderRadius.s};
    padding: 0 ${({ theme }) => theme.padding.m};
    border: none;

    font-size: ${({ theme }) => theme.fontSize.xs};
    letter-spacing: ${({ theme }) => theme.letterSpacing.m};
    user-select: none;
`;

export const Result = styled.input`
    width: 100%;
    height: 80%;
    border: none;
    outline: none;

    background-color: transparent;

    font-size: ${({ theme }) => theme.fontSize.m};
    color: ${({ theme }) => theme.colors.secondary};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const OpacityBar = styled.div.attrs(({ width }) => ({
    style: {
        width: `${width}px`,
    },
}))`
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.s};
    opacity: 0.5;
`;

export const MainBar = styled.div`
    position: relative;
    top: 10%;
    left: 50%;

    display: flex;
    align-items: center;
    width: 270px;
    height: 20px;
    transform: translate(-50%, -50%);
    border-radius: ${({ theme }) => theme.borderRadius.xxl};
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.colors.secondary};

    cursor: pointer;

    &:hover ${OpacityBar} {
        width: ${(props) => props.opacityWidth}px;

        background-color: ${({ theme }) => theme.colors.accent_1};
    }
`;

export const ProgressBar = styled.div.attrs(({ position }) => ({
    style: {
        width: position,
    },
}))`
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.xxl};

    background: ${({ theme }) => theme.colors.accent_2};
`;

export const Draggable = styled.div.attrs(({ position }) => ({
    style: {
        left: position,
    },
}))`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    box-shadow: 0 0 1px 0 ${({ theme }) => theme.colors.black};

    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    font-size: ${({ theme }) => theme.fontSize.m};

    cursor: grab;
`;
