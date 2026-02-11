import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDetails() {
  const [users, setUsers] = useState([]);

  // 1. Function pehle banayein
  const fetchUsers = async () => {
    try {
      // Pura URL dekar check karein
      const response = await axios.get("http://localhost:5000/api/get-data");

      // Agar data array hai tabhi set karein
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Data array nahi hai:", response.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteUser = async (username) => {
    if (window.confirm("Kya aap wakayi is user ko delete karna chahte hain?")) {
      try {
        // Yahan hum ID ko URL ke saath bhej rahe hain
        const response = await axios.delete(
          `http://localhost:5000/api/delete-user/${username}`,
        );

        if (response.data.status === "success") {
          alert("Deleted!");
          fetchUsers(); // List ko refresh karne ke liye dobara call karein
        }
      } catch (error) {
        console.error("Delete karne mein galti:", error);
      }
    }
  };

  // 2. useEffect baad mein
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <table
        border="1"
        style={{ width: "100%", color: "white", borderColor: "gray" }}
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Check karein ke users khali na ho */}
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user.username)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Loading data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
