import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  /**
   * login: 
   *  - Calls the SignNow OAuth endpoint
   *  - If successful, stores access_token, sets user
   *  - Throws if invalid credentials or network error
   */
  const login = async (credentials) => {
    /*try {
      const response = await fetch("http://localhost:5143/api/signnow/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: credentials.email,
          Password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur login:", errorText);
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Réponse login:", data); // accède à data.access_token

      // 1. Store the returned token for later use
      localStorage.setItem("accessToken", data.access_token);

      // 2. Set a minimal user object in state. 
      //    You might want to decode a JWT or fetch user details separately.
      const signedInUser = { email: credentials.email };
      setUser(signedInUser);

      return signedInUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }*/

       // 1. Fetch your local users.json file
    const response = await fetch("/users.json");
    if (!response.ok) {
      throw new Error("Failed to load users.json");
    }

    // 2. Parse the array of user objects
    const users = await response.json();

    // 3. Look for a user whose email/password match the credentials
    const foundUser = users.find(
      (u) =>
        u.email === credentials.email &&
        u.password === credentials.password
    );

    // 4. If no user is found, throw an error
    if (!foundUser) {
      throw new Error("Invalid credentials");
    }

    // 5. Otherwise, set state and return the found user
    setUser(foundUser);
    return foundUser;
  };

  /**
   * isAdmin:
   *  - Assume your `user` object has a `role` field or 
   *    you stored role info in the token itself.
   *  - Here, we simply check user.role === "admin".
   */
  const isAdmin = () => {
    if (!user) return false;
    return user.role === "admin"; 
    // or, if the SignNow token is a JWT and contains role claims:
    //   const token = localStorage.getItem("accessToken");
    //   decode JWT and check if "role":"admin" is present.
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, isAdmin, logout, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
