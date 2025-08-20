import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import AdminLoginModal from "../auth/AdminLoginModal"; // We'll create this next

const SidebarContainer = styled.aside`
  width: 220px;
  background: lightblue;
  padding: 10pt;
  display: flex;
  flex-direction: column;
  gap: 5pt;
`;

const NavItem = styled(NavLink)`
  padding: 8px;
  color: #333;
  text-decoration: none;

  &.active {
    background: #cce4ff;
    font-weight: bold;
  }

  &:hover {
    background: #e0e0e0;
  }
`;

const AdminButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  text-align: left;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const DocumentButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  text-align: left;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const SideBar = () => {
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminClick = () => {
    setShowAdminModal(true);
  };

  const closeModal = () => {
    setShowAdminModal(false);
  };

  return (
    <SidebarContainer>
      <NavItem to="/dashboard">Dashboard</NavItem>
      <NavItem to="/documents">Documents</NavItem>
      <NavItem to="/workflows">Workflows</NavItem>
      <NavItem to="/library">Library</NavItem>
      <AdminButton onClick={handleAdminClick}>Admin</AdminButton>

      {showAdminModal && <AdminLoginModal onClose={closeModal} />}
    </SidebarContainer>
  );
};

export default SideBar;
