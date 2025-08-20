import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px;
  margin: 10% auto;
  width: 300px;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
  margin: 8px 0;
`;

const Button = styled.button`
  background: #007BFF;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  margin-top: 8px;
`;

const AdminLoginModal = ({ onClose }) => {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAdmin } = useAuth();

  const handleLogin = async () => {
  const credentials = { email, password };
  const isUserAdmin = await isAdmin(credentials);

  if (isUserAdmin) {
    try {
      await isAdmin(credentials);
      navigate("/admin");
      onClose();
    } catch (err) {
      alert("Login failed.");
    }
  } else {
    alert("Access denied. Admins only.");
  }

};

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>Admin Login</h3>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={onClose} style={{ background: "#999", marginLeft: "8px" }}>
          Cancel
        </Button>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default AdminLoginModal;
