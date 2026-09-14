"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ShoppingCart, Monitor, Smartphone, Shirt, Sun, Sofa, Wrench, HeartPulse, Baby, Globe, ArrowRight, X, Plus, Minus } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "https://lumia-whatsapp-agent.onrender.com";

const fallbackProducts = [
 {id:"demo-phone",name:"Smart Mobile Phone",category:"Mobile Phones",description:"Modern smartphone with reliable everyday performance.",price:180000,currency:"RWF",image_url:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"},
 {id:"demo-laptop",name:"Professional Laptop",category:"Computers",description:"Reliable laptop for work, business and study.",price:650000,currency:"RWF",image_url:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"},
 {id:"demo-shirt",name:"Premium Fashion Shirt",category:"Clothing",description:"Comfortable and stylish clothing for everyday wear.",price:25000,currency:"RWF",image_url:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"}
];

const icons:any = {Clothing:Shirt, Computers:Monitor, "Mobile Phones":Smartphone, Solar:Sun, Furniture:Sofa, Equipment:Wrench, "Health & Care":HeartPulse, Children:Baby, "Digital Services":Globe};

export default function Marketplace(){
 const [products,setProducts]=useState<any[]>([]);
 const [query,setQuery]=useState("");
 const [category,setCategory]=useState("All");
 const [menu,setMenu]=useState(false);
 const [cart,setCart]=useState<any[]>([]);
 const [selected,setSelected]=useState<any>(null);

 useEffect(()=>{
  fetch(API+"/api/marketplace/products")
   .then(r=>r.ok?r.json():Promise.reject())
   .then(d=>setProducts(Array.isArray(d.products)&&d.products.length?d.products:fallbackProducts))
   .catch(()=>setProducts(fallbackProducts));
 },[]);

 const productCategories=useMemo(()=>["All",...Array.from(new Set(products.map(p=>p.category).filter(Boolean)))],[products]);
 const visible=products.filter(p=>(category==="All"||p.category===category)&&String(p.name||"").toLowerCase().includes(query.toLowerCase()));
 const total=cart.reduce((sum,p)=>sum+Number(p.price||0),0);

 const addToCart=(product:any)=>{
  setCart(items=>items.some(x=>x.id===product.id)?items:[...items,product]);
  setSelected(null);
 };

 return <main className="market">
  <div className="marketTopbar">Quality products · Trusted services · LUMIA Marketplace</div>

  <header className="marketHeader">
   <a className="marketBrand" href="/">LUMIA <span>MARKET</span></a>
   <button className="marketMenu" onClick={()=>setMenu(!menu)}>{menu?"Close":"Menu"}</button>
   <nav className={menu?"navOpen":""}>
    <a href="#products">Products</a><a href="#categories">Categories</a><a href="#services">Services</a><a href="/portal/marketplace">Admin Portal</a>
   </nav>
   <button className="cart" onClick={()=>document.getElementById("cart")?.scrollIntoView({behavior:"smooth"})}><ShoppingCart size={18}/> Cart ({cart.length})</button>
  </header>

  <section className="marketHero">
   <div>
    <p className="eyebrow">LUMIA SERVICES PROVIDER</p>
    <h1>Everything you need, in one trusted marketplace.</h1>
    <p>Discover technology, fashion, home essentials and professional digital services through the LUMIA ecosystem.</p>
    <a href="#products" className="shopBtn">Explore products <ArrowRight size={18}/></a>
   </div>
   <div className="heroPhoto"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85" alt="LUMIA Marketplace"/></div>
  </section>

  <section id="categories" className="categorySection">
   <p className="eyebrow">DISCOVER MORE</p><h2>Shop by category</h2>
   <div className="categoryGrid">
    {productCategories.map((name:any)=>{
     const Icon=icons[name]||ShoppingCart;
     return <button key={name} className={category===name?"cat activeCat":"cat"} onClick={()=>{setCategory(name);document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}}>
      <Icon size={23}/><span>{name==="All"?"All products":name}</span>
     </button>
    })}
   </div>
  </section>

  <section id="products" className="productsSection">
   <div className="sectionHead">
    <div><p className="eyebrow">REAL PRODUCTS</p><h2>Featured marketplace</h2></div>
    <div className="searchBox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/></div>
   </div>
   <div className="productGrid">
    {visible.map(p=><article className="productCard" key={p.id}>
     <div className="productImageWrap"><img src={p.image_url||fallbackProducts[0].image_url} alt={p.name}/></div>
     <div className="productInfo">
      <span>{p.category}</span><h3>{p.name}</h3><p>{p.description||"Quality product available through LUMIA Marketplace."}</p>
      <strong>{Number(p.price)>0?Number(p.price).toLocaleString()+" "+(p.currency||"RWF"):"Request a quote"}</strong>
      <button onClick={()=>setSelected(p)}>View product <ArrowRight size={16}/></button>
     </div>
    </article>)}
   </div>
   {!visible.length&&<div className="emptyProducts">No products found. Try another search.</div>}
  </section>

  <section id="cart" className="cartSection">
   <div><p className="eyebrow">YOUR ORDER</p><h2>Shopping cart</h2></div>
   {cart.length===0?<p className="cartEmpty">Your cart is empty. Choose a product to start your order.</p>:<div className="cartList">{cart.map(item=><div key={item.id} className="cartItem"><img src={item.image_url||fallbackProducts[0].image_url} alt=""/><div><strong>{item.name}</strong><span>{Number(item.price||0).toLocaleString()} {item.currency||"RWF"}</span></div><button onClick={()=>setCart(x=>x.filter(p=>p.id!==item.id))}><X size={18}/></button></div>)}<div className="cartTotal"><strong>Total: {total.toLocaleString()} RWF</strong><button onClick={()=>alert("Your order request has been prepared. The next step is connecting checkout and payment.")}>Continue to checkout</button></div></div>}
  </section>

  <section id="services" className="services">
   <p className="eyebrow">PROFESSIONAL SERVICES</p><h2>Build your next digital project with LUMIA</h2>
   <div>
    <article><Globe size={28}/><h3>Websites</h3><p>Professional business websites and web applications.</p></article>
    <article><Smartphone size={28}/><h3>Mobile Apps</h3><p>Modern Android and mobile applications.</p></article>
    <article><Wrench size={28}/><h3>Custom Solutions</h3><p>Technology solutions designed for your business.</p></article>
   </div>
  </section>

  <footer>© 2026 LUMIA Marketplace · Connected to LUMIA AI Portal & Backend</footer>

  {selected&&<div className="productModal" onClick={()=>setSelected(null)}>
   <div className="modalCard" onClick={e=>e.stopPropagation()}>
    <button className="modalClose" onClick={()=>setSelected(null)}><X/></button>
    <img src={selected.image_url||fallbackProducts[0].image_url} alt={selected.name}/>
    <div><span className="eyebrow">{selected.category}</span><h2>{selected.name}</h2><p>{selected.description}</p><strong className="modalPrice">{Number(selected.price||0).toLocaleString()} {selected.currency||"RWF"}</strong><button className="modalBuy" onClick={()=>addToCart(selected)}><Plus size={18}/> Add to cart</button></div>
   </div>
  </div>}
 </main>
}