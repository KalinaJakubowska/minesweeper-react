import styled from "styled-components";

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 20% 1fr;
    margin: 0 auto;
    width: ${({ columns }) => columns * 40}px;
    border: 20px solid ${({ theme }) => theme.color.first};
    border-bottom: none;
    background: ${({ theme }) => theme.color.shadow};
    color: ${({ theme }) => theme.color.second};
`
