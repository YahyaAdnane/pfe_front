import React from "react";
import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const ShellContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const MainArea = styled.div`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 4pt;
  background: 4pt;
  overflow-y: auto;
`;

const AppShell = ({ children }) => (
  <ShellContainer>
    <Header />
    <MainArea>
    <SideBar />
    <ContentArea> <Outlet /> </ContentArea>
    </MainArea>
  </ShellContainer>
);

export default AppShell;
