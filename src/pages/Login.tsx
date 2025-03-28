import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // ✅ Moved inside component

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/users"); // ✅ Redirect after successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error} aria-live="polite">{error}</p>}

      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center" as const,
  } as React.CSSProperties,

  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  } as React.CSSProperties,

  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  } as React.CSSProperties,

  inputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    textAlign: "left" as const,
  } as React.CSSProperties,

  input: {
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  } as React.CSSProperties,

  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  } as React.CSSProperties,
};

export default Login;