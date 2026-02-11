import React, { useState } from "react";
import axios from "axios";

const Registration = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    contact: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Node.js server ka pura URL localhost par zaroori hai agar proxy nahi hai
      const response = await axios.post(
        "http://localhost:5000/api/save",
        formData,
      );
      if (response.data.status === "success") {
        alert("Data Saved Successfully!");
        props.onUserAdded();
        // Form clear karne ke liye
        setFormData({ username: "", email: "", age: "", contact: "" });
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h1>Crud projects By imran</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={formData.username} // Value dena zaroori hai
          style={{ padding: "10px" }}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          style={{ padding: "10px" }}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          style={{ padding: "10px" }}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Contact"
          value={formData.contact}
          style={{ padding: "10px" }}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
          required
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
          }}
        >
          Submit Data
        </button>
      </form>
    </div>
  );
};

export default Registration;
