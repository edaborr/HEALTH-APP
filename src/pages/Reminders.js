import React from "react";
import { FaBell } from "react-icons/fa";

function Reminders() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔔 Sağlık Hatırlatmaları</h2>

      <div style={styles.card}>
        <div style={styles.item}>
          <FaBell />
          <span>Yıllık kontrol zamanı</span>
        </div>

        <div style={styles.item}>
          <FaBell />
          <span>Aşı kontrolü önerilir</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
  },

  title: {
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px 0",
    borderBottom: "1px solid #eee",
  },
};

export default Reminders;