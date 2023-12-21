import React, { useState, useEffect } from "react";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [alignerInfo, setAlignerInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Fetch User Data
        const userResponse = await fetch("http://localhost:3000/api/user", {
          headers,
        });
        const userData = await userResponse.json();
        setUserData(userData);
        console.log(userData);
        // Fetch Treatment Plan (assuming endpoint and logic)
        // You'll need to adjust the URL and logic based on your actual API and data structure
        const treatmentResponse = await fetch(
          "http://localhost:3000/api/treatment_plans",
          { headers }
        );
        const treatmentData = await treatmentResponse.json();
        setTreatmentPlan(treatmentData);
        console.log(treatmentData);

        // Fetch Aligner Info
        // Similar to above, adjust as needed
        const alignerResponse = await fetch(
          "http://localhost:3000/api/aligners",
          { headers }
        );
        const alignerData = await alignerResponse.json();
        setAlignerInfo(alignerData);
        console.log(alignerData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately
      }
    };

    fetchData();
  }, []);

  if (!userData || !treatmentPlan || !alignerInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Display User Info */}
      <p>Username: {userData.username}</p>
      {/* ... other user data ... */}

      {/* Display Treatment Plan Info */}
      {/* ... treatment plan data ... */}

      {/* Display Aligner Info */}
      {/* ... aligner info ... */}
    </div>
  );
}

export default Dashboard;
