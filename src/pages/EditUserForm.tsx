import React, { useState } from "react";
import axios from "axios";

interface User {
  avatar: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface EditUserFormProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose, onUpdate }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });

      const updatedUser = { ...user, first_name: firstName, last_name: lastName, email: email };
      onUpdate(updatedUser);

      alert("User updated successfully!");
      onClose();
    } catch (err) {
      setError("Failed to update user.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Edit User</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={styles.input} />

          <label style={styles.label}>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={styles.input} />

          <label style={styles.label}>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />

          <div style={styles.buttonContainer}>
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000,
  },
  formContainer: {
    background: "white", padding: "25px", borderRadius: "10px",
    textAlign: "center" as const, width: "350px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  heading: {
    marginBottom: "15px",
    fontSize: "20px",
    color: "#333",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  label: {
    textAlign: "left" as const,
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border 0.3s",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  button: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
    marginRight: "10px",
    transition: "background 0.3s",
  },
  cancelButton: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
    transition: "background 0.3s",
  },
};

export default EditUserForm;