import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://15.168.140.61:5000/api/dashboard", {
          
          headers: { Authorization: localStorage.getItem("token") },
        });
        setCards(res.data);
      } catch (err) {
        navigate("/");
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {cards.map((card) => (
        <div key={card.id} onClick={() => navigate("/map")}>
          {card.title}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
