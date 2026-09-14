"use client";

import { useEffect, useState } from "react";
import { Search, ShoppingCart, Monitor, Smartphone, Shirt, Sun, Sofa, Wrench, HeartPulse, Baby, Globe, ArrowRight } from "lucide-react";

const API="https://lumia-whatsapp-agent.onrender.com";
const categories=[
["Clothing",Shirt],["Computers",Monitor],["Mobile Phones",Smartphone],["Solar",Sun],["Furniture",Sofa],["Equipment",Wrench],["Health & Care",HeartPulse],["Children",Baby],["Digital Services",Globe]
];

export default function Marketplace(){
 const [products,setProducts]=useState<any[]>([]); const [query,setQuery]=useState(""); const [category,setCategory]=useState("All");
 useEffect(()=>{fetch(API+"/api/marketplace/products").then(r=>r.json()).then(d=>setProducts(d.products||[])).catch(()=>setProducts([]))},[]);
 const visible=products.filter(p=>(category==="All"||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase()));
 return <main className="market">
  <header className="marketHeader"><a className="marketBrand" href="/">LUMIA <span>MARKET</span></a><nav><a href="#products">Products</a><a href="#services">Services</a><a href="/portal">Portal</a></nav><button className="cart"><ShoppingCart size={18}/> Cart</button></header>
  <section className="marketHero"><div><p className="eyebrow">LUMIA SERVICES PROVIDER</p><h1>Everything you need, in one trusted marketplace.</h1><p>Shop products and request professional digital services through the LUMIA ecosystem.</p><a href="#products" className="shopBtn">Explore products <ArrowRight size={18}/></a></div><div className="heroPhoto"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85" alt="Shopping marketplace"/></div></section>
  <section className="categorySection"><h2>Shop by category</h2><div className="categoryGrid"><button className={category==="All"?"cat activeCat":"cat"} onClick={()=>setCategory("All")}>All</button>{categories.map(([name,Icon]:any)=><button key={name} className={category===name?"cat activeCat":"cat"} onClick={()=>setCategory(name)}><Icon size={23}/><span>{name}</span></button>)}</div></section>
  <section id="products" className="productsSection"><div className="sectionHead"><div><p className="eyebrow">REAL PRODUCTS</p><h2>Featured marketplace</h2></div><div className="searchBox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/></div></div><div className="productGrid">{visible.map(p=><article className="productCard" key={p.id}><img src={p.image_url} alt={p.name}/><div className="productInfo"><span>{p.category}</span><h3>{p.name}</h3><p>{p.description}</p><strong>{Number(p.price)>0?Number(p.price).toLocaleString()+" "+p.currency:"Request a quote"}</strong><button onClick={()=>alert("Order request: "+p.name+". Payment and confirmation can be completed through the LUMIA team.")}>Order / Request</button></div></article>)}</div></section>
  <section id="services" className="services"><p className="eyebrow">PROFESSIONAL SERVICES</p><h2>Build your next digital project with LUMIA</h2><div><article><Globe size={28}/><h3>Websites</h3><p>Professional business websites and web applications.</p></article><article><Smartphone size={28}/><h3>Mobile Apps</h3><p>Modern Android and mobile applications.</p></article><article><Wrench size={28}/><h3>Custom Solutions</h3><p>Technology solutions for your business.</p></article></div></section>
  <footer>© 2026 LUMIA Market · Connected to LUMIA AI Portal & Backend</footer>
 </main>
}