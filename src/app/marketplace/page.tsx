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
 const [checkout,setCheckout]=useState(false);
 const [customer,setCustomer]=useState({name:"",phone:"",location:""});
 const [submitting,setSubmitting]=useState(false);
 const [notice,setNotice]=useState("");
 const [partnerOpen,setPartnerOpen]=useState(false);
 const [partner,setPartner]=useState({businessName:"",ownerName:"",phone:"",whatsappNumber:"",location:"",businessCategory:"",description:"",onlineStoreUrl:"",paymentReference:""});
 const [partnerSubmitting,setPartnerSubmitting]=useState(false);

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

 const submitPartner=async(e:any)=>{e.preventDefault();setPartnerSubmitting(true);setNotice("");try{const r=await fetch(API+"/api/marketplace/partners/apply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(partner)});const d=await r.json();if(!r.ok)throw new Error(d.error);setPartnerOpen(false);setPartner({businessName:"",ownerName:"",phone:"",whatsappNumber:"",location:"",businessCategory:"",description:"",onlineStoreUrl:"",paymentReference:""});setNotice("Partner application received. Pay 40,000 RWF via MOMO PAY 935237, then wait for Admin verification and approval.");}catch{setNotice("Unable to submit your partner application. Please check the information and try again.");}finally{setPartnerSubmitting(false);}};

 const submitOrder=async(e:any)=>{e.preventDefault(); if(!cart.length)return; setSubmitting(true); setNotice(""); try{const response=await fetch(API+"/api/marketplace/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customer_name:customer.name,phone:customer.phone,location:customer.location,items:cart,total,currency:"RWF"})}); if(!response.ok)throw new Error("Order failed"); setCart([]);setCheckout(false);setNotice("Order received successfully. LUMIA Marketplace will process your request.");setCustomer({name:"",phone:"",location:""});}catch{setNotice("Unable to send the order right now. Please try again.");}finally{setSubmitting(false);}};

 return <main className="market">
  <div className="marketTopbar"><span>🚚 Fast ordering support</span><span>✓ Trusted Marketplace</span><span>📱 Order through LUMIA AI</span></div>

  <header className="marketHeader">
   <a className="marketBrand" href="/"><b>L</b> LUMIA <span>MARKETPLACE</span></a>
   <button className="marketMenu" onClick={()=>setMenu(!menu)}>{menu?"Close":"Menu"}</button>
   <nav className={menu?"navOpen":""}>
    <a href="#products">Products</a><a href="#categories">Categories</a><a href="#services">Services</a><button className="partnerNavBtn" onClick={()=>setPartnerOpen(true)}>Become a Partner</button><a href="/portal/marketplace">Admin Portal</a>
   </nav>
   <button className="cart" onClick={()=>document.getElementById("cart")?.scrollIntoView({behavior:"smooth"})}><ShoppingCart size={18}/> Cart ({cart.length})</button>
  </header>

  <section className="marketHero"><div className="heroGlow"></div>
   <div>
    <p className="eyebrow">THE SMART WAY TO SHOP</p>
    <h1>Find what you need.<br/><em>Shop with confidence.</em></h1>
    <p>Technology, fashion, home essentials and professional services — all connected through one LUMIA marketplace.</p>
    <div className="heroActions"><a href="#products" className="shopBtn">Shop now <ArrowRight size={18}/></a><a href="#services" className="heroLink">Explore services</a></div>
    <div className="heroStats"><span><b>Real</b> products</span><span><b>Easy</b> ordering</span><span><b>AI</b> assistance</span></div>
   </div>
   <div className="heroPhoto"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85" alt="LUMIA Marketplace"/></div>
  </section>

  <section id="categories" className="categorySection">
   <div className="sectionIntro"><div><p className="eyebrow">SHOP YOUR WAY</p><h2>Explore popular categories</h2></div><p>Choose a category and discover products selected for everyday life, work and business.</p></div>
   <div className="categoryGrid">
    {productCategories.map((name:any)=>{
     const Icon=icons[name]||ShoppingCart;
     return <button key={name} className={category===name?"cat activeCat":"cat"} onClick={()=>{setCategory(name);document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}}>
      <Icon size={23}/><span>{name==="All"?"All products":name}</span>
     </button>
    })}
   </div>
  </section>

  <section className="partnerBanner"><div><p className="eyebrow">GROW WITH LUMIA</p><h2>Do you own a shop or business?</h2><p>Join LUMIA Marketplace as a Partner. After Admin approval, your business and products can be connected to LUMIA AI to help customers discover what you sell.</p><button onClick={()=>setPartnerOpen(true)}>Become a LUMIA Partner <ArrowRight size={18}/></button></div><div className="partnerSteps"><span>01<br/><b>Apply</b></span><span>02<br/><b>Admin verifies</b></span><span>03<br/><b>Get approved</b></span><span>04<br/><b>Receive customer orders</b></span></div></section>

  <section className="marketPromo"><div><p className="eyebrow">LUMIA AI SHOPPING ASSISTANT</p><h2>Not sure what to buy?</h2><p>Ask LUMIA AI on WhatsApp and get help finding the right product and its exact marketplace link.</p><a className="promoBtn" href="#products">Browse products <ArrowRight size={17}/></a></div><div className="promoVisual"><ShoppingCart size={80}/><span>SMART SHOPPING</span></div></section>

  <section id="products" className="productsSection">
   <div className="sectionHead">
    <div><p className="eyebrow">LATEST COLLECTION</p><h2>Featured products</h2></div>
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

  <section className="trustStrip"><div>✓ Quality products</div><div>🔒 Simple order process</div><div>💬 LUMIA AI assistance</div><div>📦 Marketplace order tracking</div></section>

  <section id="cart" className="cartSection">
   <div><p className="eyebrow">YOUR ORDER</p><h2>Shopping cart</h2></div>
   {cart.length===0?<p className="cartEmpty">Your cart is empty. Choose a product to start your order.</p>:<div className="cartList">{cart.map(item=><div key={item.id} className="cartItem"><img src={item.image_url||fallbackProducts[0].image_url} alt=""/><div><strong>{item.name}</strong><span>{Number(item.price||0).toLocaleString()} {item.currency||"RWF"}</span></div><button onClick={()=>setCart(x=>x.filter(p=>p.id!==item.id))}><X size={18}/></button></div>)}<div className="cartTotal"><strong>Total: {total.toLocaleString()} RWF</strong><button onClick={()=>setCheckout(true)}>Continue to checkout</button></div></div>}
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

  {partnerOpen&&<div className="productModal" onClick={()=>setPartnerOpen(false)}><form className="modalCard partnerModal" onClick={e=>e.stopPropagation()} onSubmit={submitPartner}><button type="button" className="modalClose" onClick={()=>setPartnerOpen(false)}><X/></button><div className="partnerForm"><p className="eyebrow">LUMIA MARKETPLACE PARTNER</p><h2>Partner Application</h2><p className="partnerIntro">Registration fee: <b>40,000 RWF</b> · Payment: <b>MOMO PAY 935237</b></p><div className="partnerFields">{[["businessName","Business name"],["ownerName","Owner name"],["phone","Phone number"],["whatsappNumber","WhatsApp number"],["location","Shop location"],["businessCategory","Business category"],["onlineStoreUrl","Online store URL (optional)"],["paymentReference","MOMO payment reference (after payment)"]].map(([key,label])=><label key={key}>{label}<input required={!String(key).includes("Url")&&!String(key).includes("Reference")} value={(partner as any)[key]} onChange={e=>setPartner({...partner,[key]:e.target.value})}/></label>)}</div><label>About your business<textarea value={partner.description} onChange={e=>setPartner({...partner,description:e.target.value})} placeholder="Tell LUMIA about your shop, products and services."/></label><div className="partnerPayment">Pay the 40,000 RWF registration fee to <strong>MOMO PAY: 935237</strong>. Admin will verify the payment and application before approval.</div><button className="modalBuy" disabled={partnerSubmitting}>{partnerSubmitting?"Submitting application...":"Submit Partner Application"} <ArrowRight size={18}/></button></div></form></div>}

  {checkout&&<div className="productModal" onClick={()=>setCheckout(false)}><form className="modalCard checkoutCard" onClick={e=>e.stopPropagation()} onSubmit={submitOrder}><button type="button" className="modalClose" onClick={()=>setCheckout(false)}><X/></button><div className="checkoutContent"><p className="eyebrow">SECURE ORDER REQUEST</p><h2>Checkout</h2><p>Enter your details so LUMIA Marketplace can process your order.</p><label>Full name<input required value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder="Your full name"/></label><label>Phone number<input required value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} placeholder="+250..."/></label><label>Location / Address<input required value={customer.location} onChange={e=>setCustomer({...customer,location:e.target.value})} placeholder="Your location"/></label><div className="checkoutSummary"><strong>{cart.length} product(s)</strong><strong>{total.toLocaleString()} RWF</strong></div><button className="modalBuy" disabled={submitting}>{submitting?"Sending order...":"Place order"} <ArrowRight size={18}/></button></div></form></div>}

  {notice&&<div className="marketNotice">{notice}</div>}

  {selected&&<div className="productModal" onClick={()=>setSelected(null)}>
   <div className="modalCard" onClick={e=>e.stopPropagation()}>
    <button className="modalClose" onClick={()=>setSelected(null)}><X/></button>
    <img src={selected.image_url||fallbackProducts[0].image_url} alt={selected.name}/>
    <div><span className="eyebrow">{selected.category}</span><h2>{selected.name}</h2><p>{selected.description}</p><strong className="modalPrice">{Number(selected.price||0).toLocaleString()} {selected.currency||"RWF"}</strong><button className="modalBuy" onClick={()=>addToCart(selected)}><Plus size={18}/> Add to cart</button></div>
   </div>
  </div>}
 </main>
}