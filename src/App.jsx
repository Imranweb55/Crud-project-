import React, { useState } from "react";
import Registration from "./User";
import UserDetails from "./userDetail";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Yeh function list ko refresh karega
  const handleUserAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div
      style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", color: "white" }}
    >
      {/* Function pass karna zaroori hai */}
      <Registration onUserAdded={handleUserAdded} />
      <hr />
      {/* Key badalne par UserDetails crash nahi hoga, naye siray se load hoga */}
      <UserDetails key={refreshKey} />
    </div>
  );
}

export default App;
