const RESTAURANT={name:'Sizzle Bites',lat:33.2581594,lng:73.7878513,deliveryRadiusKm:5,deliveryFee:200,whatsapp:'923429823459',easypaisa:'03429823459',maps:'https://maps.app.goo.gl/oxsw4FwUTf6G7u6s6'};
const menu=[
 ['Pizza','Sizzle Special Pizza','S/M/L/XL','649 / 1199 / 1699 / 2299'],['Pizza','Chicken Tikka Pizza','S/M/L/XL','599 / 1099 / 1549 / 2050'],['Pizza','Chicken Fajita Pizza','S/M/L/XL','599 / 1099 / 1549 / 2050'],['Pizza','Margherita Pizza','S/M/L/XL','500 / 999 / 1399 / 1799'],['Pizza','Vegetarian Pizza','S/M/L/XL','549 / 1049 / 1449 / 1799'],['Pizza','Pepperoni Pizza','S/M/L/XL','599 / 1099 / 1549 / 1999'],['Pizza','Peri Peri Pizza','S/M/L/XL','700 / 1299 / 1849 / 2349'],['Pizza','B.B.Q Pizza','S/M/L/XL','649 / 1199 / 1699 / 2299'],['Pizza','Malai Boti Pizza','S/M/L/XL','649 / 1199 / 1699 / 2299'],['Pizza','Creamy Pizza','S/M/L/XL','649 / 1199 / 1699 / 2299'],
 ['Burgers','Zinger Burger','Single / Meal','450 / 650'],['Burgers','Chicken Burger','Single / Meal','299 / 499'],['Burgers','Grilled Burger','Single / Meal','499 / 699'],['Burgers','Double Decker','Single / Meal','599 / 799'],['Burgers','Mexicano Hot','Single / Meal','399 / 599'],['Burgers','Peri Peri Burger','Single / Meal','599 / 799'],['Burgers','Beef Burger','Single / Meal','650 / 850'],['Burgers','Fish Burger','Single / Meal','599 / 799'],['Burgers','Fillet Burger','Single / Meal','399 / 599'],
 ['Wings','Fried Wings','6 pcs / Meal','450 / 650'],['Wings','Grilled Wings','6 pcs / Meal','499 / 699'],['Wings','B.B.Q Wings','6 pcs / Meal','499 / 699'],['Wings','Peri Peri Wings','6 pcs / Meal','550 / 750'],
 ['Chicken','Chicken Strips','Regular / Meal','500 / 699'],['Chicken','Chicken Pieces','Regular / Meal','300 / 499'],['Chicken','Nuggets','6 pcs / Meal','350 / 550'],
 ['Fries','Fries','Regular / Large','250 / 399'],['Fries','Peri Peri Fries','Regular / Large','350 / 599'],['Fries','Cheese Fries','Regular / Large','350 / 599'],['Fries','Loaded Fries','Regular / Large','599 / 1099'],
 ['Wraps','Crispy Wrap','Regular / Meal','399 / 599'],['Wraps','Creamy Wrap','Regular / Meal','450 / 650'],['Wraps','Grilled Wrap','Regular / Meal','499 / 699'],['Wraps','Tikka Wrap','Regular / Meal','350 / 550'],['Wraps','Peri Peri Wrap','Regular / Meal','599 / 799']
];
const state={cart:[],category:'All',userLocation:null};
const money=n=>'Rs. '+n.toLocaleString('en-PK');
function parsePrice(s){return Number(s.split('/')[0].trim())}
function getPrice(item,option=0){return Number(item[3].split('/')[option]?.trim()||item[3].split('/')[0].trim())}
function getOption(item,option=0){return item[2].split('/')[option]?.trim()||item[2].split('/')[0].trim()}
function renderFilters(){const cats=['All',...new Set(menu.map(x=>x[0]))];document.getElementById('filters').innerHTML=cats.map(c=>`<button class="filter ${c===state.category?'active':''}" data-cat="${c}">${c}</button>`).join('');document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{state.category=b.dataset.cat;renderFilters();renderMenu()})}
function renderMenu(){
 const grid=document.getElementById('menuGrid');
 const rows=menu.filter(x=>state.category==='All'||x[0]===state.category);
 grid.innerHTML=rows.map((x)=>{
   const id=menu.indexOf(x);
   const options=x[2].split('/').map(v=>v.trim());
   const prices=x[3].split('/').map(v=>Number(v.trim()));
   const optionHtml=options.map((o,i)=>`<option value="${i}">${o} — ${money(prices[i])}</option>`).join('');
   return `<article class="menu-card" data-id="${id}">
     <div class="eyebrow">${x[0]}</div>
     <h3>${x[1]}</h3>
     <p class="menu-description">Choose your preferred option and add it to your order.</p>
     <label class="option-label">Option<select class="menu-option" data-id="${id}">${optionHtml}</select></label>
     <div class="price-row"><span class="price" data-price-for="${id}">${money(prices[0])}</span><button class="add" data-id="${id}">Add to order</button></div>
   </article>`;
 }).join('');
 document.querySelectorAll('.menu-option').forEach(select=>select.onchange=()=>{
   const id=Number(select.dataset.id);
   const prices=menu[id][3].split('/').map(v=>Number(v.trim()));
   document.querySelector(`[data-price-for="${id}"]`).textContent=money(prices[Number(select.value)]);
 });
 document.querySelectorAll('.add').forEach(b=>b.onclick=()=>{
   const id=Number(b.dataset.id);
   const select=document.querySelector(`.menu-option[data-id="${id}"]`);
   addToCart(id,Number(select.value));
 });
}
function addToCart(id,option=0){let found=state.cart.find(x=>x.id===id&&x.option===option);if(found)found.qty++;else state.cart.push({id,option,qty:1});updateCart();openCart()}
function updateCart(){const count=state.cart.reduce((a,b)=>a+b.qty,0),sub=state.cart.reduce((a,b)=>a+getPrice(menu[b.id],b.option)*b.qty,0);document.getElementById('cartCount').textContent=count;document.getElementById('subtotal').textContent=money(sub);document.getElementById('total').textContent=money(sub+RESTAURANT.deliveryFee);document.getElementById('checkoutTotal').textContent=money(sub+RESTAURANT.deliveryFee);const box=document.getElementById('cartItems');box.innerHTML=state.cart.length?state.cart.map(x=>`<div class="cart-line"><div><strong>${menu[x.id][1]}</strong><small>${getOption(menu[x.id],x.option)} • ${money(getPrice(menu[x.id],x.option))} each</small></div><div class="qty"><button onclick="changeQty(${x.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${x.id},1)">+</button></div></div>`).join(''):'<p class="muted">Your cart is empty. Add something delicious!</p>'}
window.changeQty=(id,d)=>{const x=state.cart.find(x=>x.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)state.cart=state.cart.filter(x=>x.id!==id);updateCart()}
function openCart(){document.getElementById('cartDrawer').classList.add('open');document.getElementById('cartDrawer').setAttribute('aria-hidden','false')}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('cartDrawer').setAttribute('aria-hidden','true')}
function openCheckout(){if(!state.cart.length)return alert('Please add at least one item first.');closeCart();document.getElementById('checkoutModal').classList.add('open')}
function closeCheckout(){document.getElementById('checkoutModal').classList.remove('open')}
function haversine(a,b,c,d){const R=6371,toRad=v=>v*Math.PI/180,dLat=toRad(c-a),dLon=toRad(d-b);const h=Math.sin(dLat/2)**2+Math.cos(toRad(a))*Math.cos(toRad(c))*Math.sin(dLon/2)**2;return R*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))}
function setLocation(lat,lng){const km=haversine(RESTAURANT.lat,RESTAURANT.lng,lat,lng);state.userLocation={lat,lng,km};document.getElementById('locationText').textContent=`Location selected • approx. ${km.toFixed(2)} km from Sizzle Bites`;const w=document.getElementById('distanceWarning');if(km>RESTAURANT.deliveryRadiusKm){w.classList.remove('hidden');w.textContent=`Sorry — this location is about ${km.toFixed(2)} km away. We deliver within 5 km of Sizzle Bites.`}else{w.classList.add('hidden');}}
document.getElementById('locationBtn').onclick=()=>{if(!navigator.geolocation){alert('Location is not supported by this browser. Please enter your address manually.');return}navigator.geolocation.getCurrentPosition(p=>setLocation(p.coords.latitude,p.coords.longitude),()=>alert('We could not access your location. Please allow location permission or enter your address manually.'),{enableHighAccuracy:true,timeout:10000})};
document.getElementById('checkoutBtn').onclick=openCheckout;document.getElementById('cartBtn').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;document.getElementById('closeCheckout').onclick=closeCheckout;
document.querySelectorAll('input[name=payment]').forEach(r=>r.onchange=()=>document.getElementById('easypaisaNote').classList.toggle('hidden',r.value!=='EasyPaisa'));
document.getElementById('checkoutForm').onsubmit=e=>{e.preventDefault();if(!state.cart.length)return; if(state.userLocation&&state.userLocation.km>5)return alert('This location is outside the 5 km delivery area.');const name=document.getElementById('customerName').value.trim(),phone=document.getElementById('customerPhone').value.trim(),addr=document.getElementById('customerAddress').value.trim(),payment=document.querySelector('input[name=payment]:checked').value,note=document.getElementById('orderNote').value.trim();const sub=state.cart.reduce((a,b)=>a+getPrice(menu[b.id],b.option)*b.qty,0),total=sub+200;let lines=state.cart.map(x=>`• ${menu[x.id][1]} (${getOption(menu[x.id],x.option)}) x${x.qty} — ${money(getPrice(menu[x.id],x.option)*x.qty)}`).join('\n');let msg=`*New Sizzle Bites Order*\n\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${addr}\n${state.userLocation?`Google Maps location: https://www.google.com/maps?q=${state.userLocation.lat},${state.userLocation.lng}\nDistance: ${state.userLocation.km.toFixed(2)} km\n`:''}\n*Items*\n${lines}\n\nSubtotal: ${money(sub)}\nDelivery: ${money(200)}\n*Total: ${money(total)}*\nPayment: ${payment}\n${note?`Note: ${note}\n`:''}\nPlease call the customer to confirm the order.`;window.open(`https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');closeCheckout();document.getElementById('successToast').classList.add('show');setTimeout(()=>document.getElementById('successToast').classList.remove('show'),7000)};
document.getElementById('themeBtn').onclick=()=>{document.body.classList.toggle('dark');document.getElementById('themeBtn').textContent=document.body.classList.contains('dark')?'☀':'☾';localStorage.setItem('sizzleTheme',document.body.classList.contains('dark')?'dark':'light')};if(localStorage.getItem('sizzleTheme')==='dark'){document.body.classList.add('dark');document.getElementById('themeBtn').textContent='☀'}document.getElementById('year').textContent=new Date().getFullYear();renderFilters();renderMenu();updateCart();
