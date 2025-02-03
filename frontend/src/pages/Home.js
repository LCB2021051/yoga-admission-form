import React, { useState, useEffect } from "react";
import { getBatches, getMembership } from "../services/api";
import MembershipForm from "../components/MembershipForm";

const Home = () => {
  const [batches, setBatches] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [activeTab, setActiveTab] = useState("batches");
  const [user, setUser] = useState(null);
  const [activeMembership, setActiveMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) return;

      const userData = JSON.parse(storedUser);
      setUser(userData);

      try {
        const [batchRes, membershipRes] = await Promise.all([
          getBatches(),
          getMembership(userData.user_id),
        ]);

        setBatches(batchRes.data);

        // ✅ Sort Memberships by Expiry Date (Latest First)
        const sortedMemberships = (membershipRes.data || []).sort(
          (a, b) => new Date(b.expiry_date) - new Date(a.expiry_date)
        );

        setMemberships(sortedMemberships);

        // ✅ Identify the Active Membership
        const active = sortedMemberships.find(
          (m) => new Date(m.expiry_date) > new Date()
        );

        setActiveMembership(active || null);
      } catch (error) {
        console.error("❌ Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // ✅ Handle Responsive Changes
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔄 Refresh Membership List After New Registration
  const handleMembershipUpdate = async () => {
    try {
      const membershipRes = await getMembership(user.user_id);
      const sortedMemberships = (membershipRes.data || []).sort(
        (a, b) => new Date(b.expiry_date) - new Date(a.expiry_date)
      );

      setMemberships(sortedMemberships);

      const active = sortedMemberships.find(
        (m) => new Date(m.expiry_date) > new Date()
      );

      setActiveMembership(active || null);
    } catch (error) {
      console.error("❌ Error updating memberships", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      {/* ✅ User Greeting */}
      {user && <h2 style={styles.heading}>Welcome, {user.name}!</h2>}

      {/* ✅ Navbar for Small Screens */}
      {isMobile && (
        <nav style={styles.navbar}>
          <button
            style={activeTab === "batches" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("batches")}
          >
            Batches Info
          </button>
          <button
            style={activeTab === "membership" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("membership")}
          >
            Membership Info
          </button>
        </nav>
      )}

      {/* ✅ Main Content */}
      <div style={isMobile ? styles.mobileView : styles.desktopView}>
        {/* ✅ Batches Section */}
        <div
          style={
            isMobile && activeTab !== "batches"
              ? { display: "none" }
              : styles.leftPane
          }
        >
          <h2>Available Batches</h2>
          <div style={styles.batchGrid}>
            {batches.length > 0 ? (
              batches.map((batch) => (
                <div key={batch.batch_id} style={styles.batchCard}>
                  <p>{batch.timing}</p>
                </div>
              ))
            ) : (
              <p>No batches available.</p>
            )}
          </div>
        </div>

        {/* ✅ Membership Section */}
        <div
          style={
            isMobile && activeTab !== "membership"
              ? { display: "none" }
              : styles.rightPane
          }
        >
          {/* ✅ Show Active Membership */}
          {activeMembership ? (
            <div style={styles.activeMembership}>
              <h2>Active Membership</h2>
              <p style={styles.name}>{user.name}</p>
              <p style={styles.batch}>
                Batch: <strong>{activeMembership.batch_id}</strong>
              </p>
              <p style={styles.expiry}>
                Expires on:{" "}
                <strong>
                  {new Date(activeMembership.expiry_date).toLocaleDateString()}
                </strong>
              </p>
            </div>
          ) : (
            <MembershipForm onSuccess={handleMembershipUpdate} />
          )}

          {/* ✅ Membership History */}
          <h2>Membership History</h2>
          <ul style={styles.list}>
            {memberships.length > 0 ? (
              memberships.map((m) => {
                const isExpired = new Date(m.expiry_date) < new Date();

                return (
                  <li
                    key={m.membership_id}
                    style={{
                      ...styles.listItem,
                      color: isExpired ? "gray" : "black", // Slate color for expired
                      textDecoration: isExpired ? "line-through" : "none",
                    }}
                  >
                    Membership for Batch: {m.batch_id} |{" "}
                    {isExpired ? (
                      <span>
                        Expired on:{" "}
                        <strong>
                          {new Date(m.expiry_date).toLocaleDateString()}
                        </strong>
                      </span>
                    ) : (
                      <span>
                        Expires on:{" "}
                        <strong>
                          {new Date(m.expiry_date).toLocaleDateString()}
                        </strong>
                      </span>
                    )}
                  </li>
                );
              })
            ) : (
              <p>No membership records found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ✅ Styling
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "40px",
    textAlign: "center",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    background: "#979797",
    marginRight: "10px",
    borderRadius: "5px",
  },
  activeTab: {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    background: "#4482C1",
    color: "white",
    marginRight: "10px",
    borderRadius: "5px",
  },
  desktopView: {
    display: "flex",
    gap: "20px",
  },
  leftPane: {
    flex: "4",
  },
  rightPane: {
    flex: "6",
    maxWidth: "600px",
  },
  batchGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    padding: "10px",
  },
  batchCard: {
    background: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  activeMembership: {
    backgroundImage:
      "URL('https://static.vecteezy.com/system/resources/thumbnails/029/266/226/small_2x/ornate-gold-background-adding-elegance-to-designs-generative-ai-photo.jpeg')",
    padding: "15px",
    borderRadius: "8px",
    maxWidth: "500px",
    margin: "auto",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "auto",
    maxWidth: "500px",
  },
  listItem: {
    background: "#fff",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#4482C1",
    marginBottom: "40px",
  },
};

export default Home;
