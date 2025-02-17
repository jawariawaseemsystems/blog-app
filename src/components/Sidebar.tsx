import React from "react";
import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router";

const SidebarContent = styled.div`
    width: 25%;
    height: 93vh;
`;

const SidebarList = styled.div`
    margin-top: 2rem;
`;

const SidebarLink = styled(Link)`
    display: block;
    text-decoration: none;
    color: #000000;
    font-size: 14px;
    font-weight: 800;
    padding: 10px 5px;
    transition: background 0.3s ease;

    &:hover {
        text-decoration: none;
        background-color: #e3f6fd;
    }
    margin-left: 10px;
`;

const LogoWrapper = styled.div`
    background: #397bf6;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    font-weight: 100;
`;

const Icons = styled.img`
    width: 25px;
    height: 25px;
`;

const ProfileImage = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const MetricsButton = styled.button`
    background: #397bf6;
    color: #ffffff;
    font-size: 10px;
    outline: none;
    border: none;
    border-radius: 2px;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    margin-top: 10px;
    cursor: pointer;
`;

const PrimaryText = styled.h3`
    margin: 0;
    padding: 0;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 100;
    text-align: center;
`;

const SecondaryText = styled.h4`
    margin: 0;
    padding: 0;
    margin-top: 5px;
    font-size: 14px;
    font-weight: 100;
    text-align: center;
    color: gray;
`;

export const Sidebar = () => {
    const { user, loading } = useUser();
    return(
        <>
            <SidebarContent>
                {
                    loading ? <h2>loading...</h2> :
                    <>
                        <LogoWrapper>
                            <Logo>
                                <Icons  src="/icons/logo.png" />
                                <span>QDB</span>
                            </Logo>
                            <Icons  src="/icons/menu.png"/>
                        </LogoWrapper>
                        <ProfileImage>
                            <img src="/icons/avatar.png" />
                        </ProfileImage>
                        <PrimaryText>{user?.name}</PrimaryText>
                        <SecondaryText> {user?.email} </SecondaryText>
                        <CenterDiv>
                            <MetricsButton>
                                <img src="/icons/metrics.png" width={15}/>
                                <span style={{marginLeft: "10px"}}>Live Metrics</span>
                            </MetricsButton>
                        </CenterDiv>
                    </>
                }
                <SidebarList>
                    <SidebarLink to="/">Dashboards</SidebarLink>
                    <SidebarLink to="/blogs">Blogs</SidebarLink>
                </SidebarList>
            </SidebarContent>
        </>
    );
}