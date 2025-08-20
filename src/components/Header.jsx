import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; // optional if using logout
import SignNowToken from "../auth/SignNowToken";

const HeaderContainer = styled.header`
  height: 60px;
  background: #acabe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8pt;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10pt;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10pt;
  gap: 5pt;
`;

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // optional

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <Logo>DocSign</Logo>
      <SignNowToken />
      
      <UserSection>
        <span>👤 {user?.name || "Guest"}</span>
        <button onClick={handleLogout}>Logout</button>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
