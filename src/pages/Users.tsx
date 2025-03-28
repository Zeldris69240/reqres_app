import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      setUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  // Client-side filtering based on search term
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User List</h2>
      {error && <p style={styles.error}>{error}</p>}

      {/* Search Input */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <div style={styles.grid}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} style={styles.card}>
                <img src={user.avatar} alt={user.first_name} style={styles.avatar} />
                <h3 style={styles.name}>{user.first_name} {user.last_name}</h3>
                <p style={styles.email}>{user.email}</p>
                <div style={styles.buttonGroup}>
                  <button onClick={() => handleEdit(user)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noResults}>No users found.</p>
          )}
        </div>
      )}
      {editUser && (
        <EditUserForm
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    padding: "40px",
    backgroundColor: "#f4f7fc",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  error: {
    color: "red",
    fontSize: "16px",
    marginBottom: "10px",
  },
  loading: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
  },
  searchContainer: {
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "300px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    margin: "auto",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center" as const,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
    border: "3px solid #007bff",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  editButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  noResults: {
    fontSize: "16px",
    color: "#555",
    marginTop: "20px",
  },
};

export default Users;