import styled, { css } from "styled-components";
import bomb from "./ico.ico";

export const GameBoard = styled.div`
    width: fit-content;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, 40px);
    grid-template-rows: repeat(${({ rows }) => rows}, 40px);

    ${({ disabled }) => disabled && css`
        pointer-events: none;
        opacity: 0.7;`
    }
`
export const GameField = styled.div`
    background-color: white;
    font-size: 35px;
    text-align: center;
    overflow: hidden;
    user-select: none;

    ${({ type }) => type === "bomb" && css`
        background-color: ${({ won }) => won ? "green" : "red"};
        background-image: url(${bomb});
        background-size: 25px;
        background-repeat: no-repeat;
        background-position: center;
    `}

    ${({ type }) => type === "border" && css`
        background-color: teal;
    `}

`
export const GameButton = styled.button`
    display: block;
    height: 40px;
    width: 40px;
    border-radius: 0;
    background-color: hsl(0, 0%, 80%);
    border: 2px outset white;
    ${({ hidden }) => hidden && css`
        display: none;
    `}

    ${({ rightClicked }) => rightClicked && css`
    background-image: url(${bomb});
    background-size: 25px;
    background-repeat: no-repeat;
    background-position: center;
    `}
`