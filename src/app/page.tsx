"use client";

import { useEffect, useState } from "react";

const API = "https://lumia-whatsapp-agent.onrender.com";

type Conversation = { phone: string; last_message_at: string; message_count: number; last_message?: string };
type Message = { role: string; text: string; created_at: string };

const nav = ["Dashboard", "Conversations", "Contacts", "AI Control", "Analytics", "Settings"];

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadConversations() {
    setLoading(true);
    try {
      const response = await fetch(API + "/api/portal/conversations");
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch {
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }

  async function openConversation(conversation: Conversation) {
    setSelected(conversation);
    try {
      const response = await fetch(API + "/api/portal/history?customer=" + encodeURIComponent(conversation.phone));
      const data = await response.json();
      setMessages(data.messages || []);
    } catch {
      setMessages([]);
    }
  }

  useEffect(() => { loadConversations(); }, []);

  const cards = [
    { title: "Conversations", value: String(conversations.length) },
    { title: "Messages", value: String(conversations.reduce((n, c) => n + Number(c.message_count || 0), 0)) },
    { title: "Contacts", value: String(conversations.length) },
    { title: "AI Status", value: "Online" }
  ];

  return <div className="portal">
    <aside className="sidebar">
      <div className="brand"><span className="brandMark">L</span><span>LUMIA</span></div>
      <p className="workspace">AI WORKSPACE</p>
      <nav className="navigation">{nav.map(item => <button key={item} className={active === item ? "navItem active" : "navItem"} onClick={() => setActive(item)}>{item}</button>)}</nav>
      <div className="sidebarBottom"><div className="agentMini"><div className="avatar">L</div><div><strong>LUMIA AI</strong><small>● Online</small></div></div></div>
    </aside>

    <main className="content">
      <header className="topbar"><div><p className="eyebrow">LUMIA WORKSPACE</p><h1>{active}</h1></div><div className="topActions"><span className="statusDot">● System Online</span><button className="profileButton">Admin</button></div></header>

      {active === "Dashboard" && <>
        <section className="hero"><div><p className="eyebrow">WELCOME BACK</p><h2>Your AI Agent is ready.</h2><p>Monitor customers, conversations and LUMIA from one workspace.</p></div><div className="heroStatus"><span>●</span><div><strong>LUMIA</strong><small>WhatsApp AI Agent</small></div></div></section>
        <section className="cards">{cards.map(card => <article className="statCard" key={card.title}><p>{card.title}</p><strong>{card.value}</strong><small>{card.title === "AI Status" ? "Agent is operational" : "Live customer data"}</small></article>)}</section>
        <section className="dashboardGrid"><article className="panel"><div className="panelHeader"><div><h3>Recent Conversations</h3><p>Latest customer activity</p></div><button className="textButton" onClick={() => setActive("Conversations")}>View all →</button></div>{conversations.slice(0,5).map(c => <button className="conversationPreview" key={c.phone} onClick={() => { setActive("Conversations"); openConversation(c); }}><strong>{c.phone}</strong><span>{c.message_count} messages</span></button>)}</article><article className="panel"><h3>Agent Overview</h3><div className="settingRow"><span>Status</span><strong className="online">● Online</strong></div><div className="settingRow"><span>Memory</span><strong>12 hours</strong></div><div className="settingRow"><span>Database</span><strong>PostgreSQL</strong></div></article></section>
      </>}

      {(active === "Conversations" || active === "Contacts") && <section className="chatLayout">
        <article className="contactsPanel"><div className="panelHeader"><div><h2>{active === "Contacts" ? "Contacts" : "Conversations"}</h2><p>{loading ? "Loading customers..." : conversations.length + " customers"}</p></div><button className="textButton" onClick={loadConversations}>Refresh</button></div>
          <div className="customerList">{conversations.map(c => <button className={selected?.phone === c.phone ? "customer activeCustomer" : "customer"} key={c.phone} onClick={() => openConversation(c)}><div className="customerAvatar">{c.phone.slice(-2)}</div><div><strong>{c.phone}</strong><small>{c.message_count} messages</small></div></button>)}</div>
        </article>
        <article className="chatPanel">{selected ? <><div className="chatHeader"><div className="customerAvatar">{selected.phone.slice(-2)}</div><div><strong>{selected.phone}</strong><small>WhatsApp customer</small></div></div><div className="messages">{messages.map((m,i) => <div key={i} className={m.role === "assistant" ? "bubble aiBubble" : "bubble userBubble"}><p>{m.text}</p><small>{new Date(m.created_at).toLocaleString()}</small></div>)}</div></> : <div className="emptyState"><div className="emptyIcon">💬</div><h3>Select a customer</h3><p>Click a customer number to view the complete chat history.</p></div>}</article>
      </section>}

      {active === "AI Control" && <section className="panel pagePanel"><h2>AI Control</h2><p>Control LUMIA behavior and instructions.</p></section>}
      {active === "Analytics" && <section className="panel pagePanel"><h2>Analytics</h2><p>Monitor customer activity and AI performance.</p></section>}
      {active === "Settings" && <section className="panel pagePanel"><h2>Settings</h2><p>Configure your LUMIA AI Portal.</p></section>}
    </main>
  </div>;
}
