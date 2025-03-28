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
  
  // Pass it to EditUserForm
  {editUser && <EditUserForm user={editUser} onClose={() => setEditUser(null)} onUpdate={handleUpdateUser} />}  

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>User List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {users.map((user) => (
            <div key={user.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
              <img src={user.avatar} alt={user.first_name} style={{ width: "80px", borderRadius: "50%" }} />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
              <button onClick={() => handleEdit(user)} style={{ marginRight: "10px" }}>Edit</button>
              <button onClick={() => handleDelete(user.id)} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
            </div>
          ))}
        </div>
      )}
      {editUser && <EditUserForm user={editUser} onClose={() => setEditUser(null)} onUpdate={fetchUsers} />}
    </div>
  );
};

export default Users;
