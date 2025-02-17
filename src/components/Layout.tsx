import React from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";

const Container = styled.div`
    display: flex;
`;

const Content = styled.div`
    padding: 1rem;
    background-color: #f0f3f8;
    width: 100%;
    box-shadow: inset 5px -2px 5px rgba(0, 0, 0, 0.1); /* Inner shadow on right & top */`;


export const Layout = ({ children }: { children: React.ReactNode }) => {
    return(
        <>
            <Container>
                <Sidebar />
                <Content>
                    {children}
                </Content>
            </Container>
        </>
    );
}