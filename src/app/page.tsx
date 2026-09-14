"use client";

export default function Home() {
  const cards = [
    { title: "Conversations", value: "0" },
    { title: "Messages Today", value: "0" },
    { title: "Contacts", value: "0" },
    { title: "AI Status", value: "Online" }
  ];

  return (
    <main style={{ minHeight: "100vh", padding: 32 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <div>
          <p style={{ color: "#35d0ba", fontWeight: 700 }}>WELCOME BACK</p>
          <h1 style={{ fontSize: 38, margin: "8px 0" }}>LUMIA AI Portal</h1>
          <p style={{ color: "#9aa8ba" }}>Manage your intelligent WhatsApp AI Agent.</p>
        </div>
        <button style={{ background: "#35d0ba", border: 0, borderRadius: 10, padding: "12px 18px", fontWeight: 700 }}>LUMIA Online</button>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
        {cards.map((card) => (
          <div key={card.title} style={{ background: "#0d1b2a", border: "1px solid #1c334b", borderRadius: 16, padding: 22 }}>
            <p style={{ color: "#9aa8ba" }}>{card.title}</p>
            <strong style={{ fontSize: 30 }}>{card.value}</strong>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 18, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
        <div style={{ background: "#0d1b2a", border: "1px solid #1c334b", borderRadius: 16, padding: 24 }}>
          <h2>Recent Conversations</h2>
          <p style={{ color: "#9aa8ba" }}>Your WhatsApp conversations will appear here after connecting the Portal to the LUMIA backend.</p>
        </div>
        <div style={{ background: "#0d1b2a", border: "1px solid #1c334b", borderRadius: 16, padding: 24 }}>
          <h2>LUMIA Agent</h2>
          <p style={{ color: "#35d0ba" }}>● Online</p>
          <p style={{ color: "#9aa8ba" }}>Memory: 12-hour sessions</p>
          <p style={{ color: "#9aa8ba" }}>Database: PostgreSQL</p>
        </div>
      </section>
    </main>
  );
}
