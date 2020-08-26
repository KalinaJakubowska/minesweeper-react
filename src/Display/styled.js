import styled from "styled-components";

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 20% 1fr 20%;
    margin: 0 auto;
    width: ${({ columns }) => columns * 40}px;
    border: 20px solid ${({ theme }) => theme.color.first};
    border-bottom: none;
    background: ${({ theme }) => theme.color.second};
    color: ${({ theme }) => theme.color.second};
`

export const Item = styled.p`
    margin: auto;
    font-family: 'Roboto Mono', monospace;
    color: teal;
    font-size: 35px;
    font-weight: bold;
`
