import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // infos utilisateur
  const [token, setToken] = useState(null);    // si un jour tu ajoutes JWT

  // Restaurer la session au refresh
  useEffect(() => {
    const saved = localStorage.getItem("auth:user");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);
  useEffect(() => {
    if (user) localStorage.setItem("auth:user", JSON.stringify(user));
    else localStorage.removeItem("auth:user");
  }, [user]);

  // ------------------ LOGIN ------------------
  const login = async (credentials) => {
    // normaliser l'email côté front (optionsnel mais utile)
    const payload = {
      email: String(credentials.email || "").trim().toLowerCase(),
      password: credentials.password,
    };

    const res = await fetch("http://localhost:5000/api/login", {   // ✅ bonne route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // renvoyer le vrai message du backend: "Utilisateur non trouvé" / "Mot de passe incorrect" / etc.
      throw new Error(data.message || "Erreur de connexion");
    }

    // ton backend renvoie { message, user } → on prend user
    const u = data.user ?? data;
    setUser(u);

    // si tu ajoutes un token plus tard:
    // if (data.token) { setToken(data.token); localStorage.setItem("auth:token", data.token); }

    return u;
  };

  // (option) register via provider, si tu veux l'utiliser depuis SignUpForm
  const register = async ({ name, email, jobTitle, password }) => {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, jobTitle, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Inscription échouée");
    return data; // on ne connecte pas automatiquement ici
  };

  const isAdmin = () => user?.role === "admin";

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth:user");
    localStorage.removeItem("auth:token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, isAdmin, logout, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
