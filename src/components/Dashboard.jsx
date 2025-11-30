import "./Dashboard.css";

import React, { useEffect, useState } from "react";
import avatar from "../assets/images/avatar_male.png";

export default function Dashboard() {
  const [timeData, setTimeData] = useState([]);
  const [timeframe, setTimeframe] = useState("daily");

  // 1. Завантаження data.json
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "data.json")
      .then(res => res.json())
      .then(data => setTimeData(data))
      .catch(err => console.error("Не вдалося завантажити data.json:", err));
  }, []);

  // 2. Отримати дані для конкретної картки
  function getTimeFor(title) {
    const item = timeData.find(d => d.title === title);
    if (!item) return { current: 0, previous: 0 };

    return item.timeframes[timeframe];
  }

  // 3. Текст "Last Week / Yesterday"
  function getLabel() {
  if (timeframe === "daily") return "Yesterday";
  return "Last Week";
}


  // 4. Список карток (як у HTML)
  const cards = [
    { title: "Work", className: "orange card--work" },
    { title: "Play", className: "blue card--play" },
    { title: "Study", className: "pink card--study" },
    { title: "Exercise", className: "green card--exercise" },
    { title: "Social", className: "purple card--social" },
    { title: "Self Care", className: "yellow card--selfcare" }
  ];

  return (
    <div className="container">

      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="profile-outer">
          <div className="avatar-wrapper">
            <img src={avatar} alt="avatar" />
          </div>

          <p className="profile-label">Report for</p>
          <h1 className="profile-name">
            Oleksandr <br />
            Tepliakov
          </h1>
        </div>

        <div className="profile-footer">
          <button
            className={`profile-period ${timeframe === "daily" ? "active" : ""}`}
            onClick={() => setTimeframe("daily")}
            data-timeframe="daily"
          >
            Daily
          </button>

          <button
            className={`profile-period ${timeframe === "weekly" ? "active" : ""}`}
            onClick={() => setTimeframe("weekly")}
            data-timeframe="weekly"
          >
            Weekly
          </button>
        </div>
      </div>

      {/* ALL CARDS */}
      <div className="cards">

        {cards.map(card => {
          const { current, previous } = getTimeFor(card.title);

          return (
            <div
              key={card.title}
              className={`card ${card.className}`}
              data-title={card.title}
            >
              <div className="card-inner">
                <div className="card-content">
                  <h3>
                    {card.title}
                    <span className="dots">
                      <span></span><span></span><span></span>
                    </span>
                  </h3>

                  <div className="hours">
                    {current}
                    {current === 1 ? "hr" : "hrs"}
                  </div>

                  <div className="last-period">
                    {getLabel()} - {previous}
                    {previous === 1 ? "hr" : "hrs"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
