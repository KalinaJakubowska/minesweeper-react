import styled, { css } from "styled-components";

export const Wrapper = styled.form`
    width: 100%;
    max-width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
`
export const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.color.second};
    border: none;
    border-top: 2px solid ${({ theme }) => theme.color.first};
    box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.color.shadow};
    margin-top: 10px;

    ${({ hidden }) => hidden && css`
        display: none;
    `}
`
export const Legend = styled.legend`
    width: fit-content;
    text-align: center;
    background-color: rgba(0, 128, 128, 0.15);
    border: 2px solid ${({ theme }) => theme.color.first};
    color: ${({ theme }) => theme.color.first};
    padding: 10px;
    font-weight: bold;
`
export const Label = styled.label`
    display: flex;
    padding: 10px;
`
export const Input = styled.input`
    flex-grow: 1;
    margin-left: 20px;
`
export const Button = styled.button`
    background-color: ${({ theme }) => theme.color.first};
    border: 2px solid hsl(180, 100%, 20%);
    color: ${({ theme }) => theme.color.second};
    padding: 10px;
    margin-top: 10px;

    &:hover {
    background-color: hsl(180, 100%, 30%);
    border-color: ${({ theme }) => theme.color.first};
    }
`
export const ErrorInfoText = styled.span`
    text-align: center;
`