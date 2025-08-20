import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #eee;
  border-bottom: 2px solid #ccc;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid "#ddd";
`;

const ToggleButton = styled.button`
  background-color:"#007BFF";
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
`;

const DetailRow = styled.tr`
  background: "#f9f9f9";
`;

// Main component
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("/users.json")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const toggleDetails = id => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const changeStatus = id => {
    const statusOptions = ["active", "inactive", "Pending", "Approved", "Archived"];
  
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id !== id) return user;
  
        const currentIndex = statusOptions.indexOf(user.status);
        const nextIndex = (currentIndex + 1) % statusOptions.length;
        return { ...user, status: statusOptions[nextIndex] };
      })
    );
  };
  

  return (
    <Table>
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <React.Fragment key={user.id}>
            <tr>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <ToggleButton onClick={() => toggleDetails(user.id)}>!</ToggleButton>
              </Td>
            </tr>
            {expanded[user.id] && (
              <DetailRow>
                <Td colSpan="3">
                  <strong>Job Title:</strong> {user.jobTitle} <br />
                  <strong>Status:</strong> {user.status}{" "}
                  <ToggleButton onClick={() => changeStatus(user.id)}> Change Status </ToggleButton><br />
                  <strong>ID:</strong> {user.id}
                </Td>
              </DetailRow>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
