"use client";

import { useState } from "react";

const nav = ["Dashboard", "Conversations", "Contacts", "AI Control", "Analytics", "Settings"];

export default function Home() {
  const [active, setActive] = useState("Dashboard");

  const cards = [
    { title: "Conversations", value: "0" },
    { title: "Messages Today", value: "0" },
    { title: "Contacts", value: "0" },
    { title: "AI Status", value: "Online" }
  ];

  return (
    <div className="portal">
      <aside className="sidebar">
        <div className="brand"><span className="brandMark">L</span><span>LUMIA</span></div>
        <p className="workspace">AI WORKSPACE</p>

        <nav className="navigation">
          {nav.map((item) => (
            <button
              key={item}
              className={active === item ? "navItem active" : "navItem"}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebarBottom">
          <div className="agentMini">
            <div className="avatar">L</div>
            <div><strong>LUMIA AI</strong><small>● Online</small></div>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">LUMIA WORKSPACE</p>
            <h1>{active}</h1>
          </div>
          <div className="topActions">
            <span className="statusDot">● System Online</span>
            <button className="profileButton">Admin</button>
          </div>
        </header>

        {active === "Dashboard" && (
          <>
            <section className="hero">
              <div>
                <p className="eyebrow">WELCOME BACK</p>
                <h2>Your AI Agent is ready.</h2>
                <p>Monitor conversations, manage customers and control LUMIA from one professional workspace.</p>
              </div>
              <div className="heroStatus"><span>●</span><div><strong>LUMIA</strong><small>WhatsApp AI Agent</small></div></div>
            </section>

            <section className="cards">
              {cards.map((card) => (
                <article className="statCard" key={card.title}>
                  <p>{card.title}</p>
                  <strong>{card.value}</strong>
                  <small>{card.title === "AI Status" ? "Agent is operational" : "Ready for live data"}</small>
                </article>
              ))}
            </section>

            <section className="dashboardGrid">
              <article className="panel">
                <div className="panelHeader"><div><h3>Recent Conversations</h3><p>Latest customer activity</p></div><button className="textButton" onClick={() => setActive("Conversations")}>View all →</button></div>
                <div className="emptyState"><div className="emptyIcon">💬</div><h3>No conversations yet</h3><p>Connect the Portal API to your LUMIA backend and WhatsApp conversations will appear here.</p></div>
              </article>

              <article className="panel">
                <div className="panelHeader"><div><h3>Agent Overview</h3><p>Current LUMIA configuration</p></div></div>
                <div className="settingRow"><span>Agent</span><strong>LUMIA</strong></div>
                <div className="settingRow"><span>Status</span><strong className="online">● Online</strong></div>
                <div className="settingRow"><span>Memory</span><strong>12 hours</strong></div>
                <div className="settingRow"><span>Database</span><strong>PostgreSQL</strong></div>
              </article>
            </section>
          </>
        )}

        {active === "Conversations" && <section className="panel pagePanel"><h2>Conversations</h2><p>Your WhatsApp conversations will be loaded here from the LUMIA backend.</p><div className="emptyState"><div className="emptyIcon">💬</div><h3>Conversation Center</h3><p>The next step is connecting this Portal to the backend API.</p></div></section>}
        {active === "Contacts" && <section className="panel pagePanel"><h2>Contacts</h2><p>Manage WhatsApp customers and contact information.</p></section>}
        {active === "AI Control" && <section className="panel pagePanel"><h2>AI Control</h2><p>Control LUMIA's behavior, instructions and AI settings.</p></section>}
        {active === "Analytics" && <section className="panel pagePanel"><h2>Analytics</h2><p>Monitor messages, conversations and agent performance.</p></section>}
        {active === "Settings" && <section className="panel pagePanel"><h2>Settings</h2><p>Configure your LUMIA AI Portal.</p></section>}
      </main>
    </div>
  );
}
