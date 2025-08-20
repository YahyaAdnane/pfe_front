import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const StyledForm = styled.form`
  max-width: 400px;
  margin: 100px auto;
  padding: 4pt;
  background: white;
  border-radius: 8pt;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 12px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit">Login</Button>
    </StyledForm>
  );
};

export default LoginForm;
