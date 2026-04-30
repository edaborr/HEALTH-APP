import React from "react";
import { FaPills, FaCheckCircle } from "react-icons/fa";

function MedicineTracking() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💊 İlaç Takibi</h2>

      <div style={styles.card}>
        
        <div style={styles.item}>
          <div style={styles.left}>
            <FaPills />
            <span>Metformin</span>
          </div>

          <button style={styles.button}>
            <FaCheckCircle /> İçildi
          </button>
        </div>

        <div style={styles.item}>
          <div style={styles.left}>
            <FaPills />
            <span>Lisinopril</span>
          </div>

          <button style={styles.button}>
            <FaCheckCircle /> İçildi
          </button>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #eee",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
  },

  button: {
    background: "linear-gradient(135deg, #28a745, #5cd65c)",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default MedicineTracking;