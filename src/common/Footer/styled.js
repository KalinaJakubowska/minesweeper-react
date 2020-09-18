import styled from "styled-components";

export const Wrapper = styled.footer`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    text-align: center;
    font-size: 14px;
    background-color: ${({ theme }) => theme.color.first};
    color: ${({ theme }) => theme.color.text};
    padding: 10px;
`