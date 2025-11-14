// ข้อมูลสินค้า — ปรับแต่งได้ตามต้องการ
const PRODUCTS = [
  {id:1,name:'เซ็ตข้าวหน้าเนื้อพรีเมียม',price:250,desc:'เนื้อคัดพิเศษ เสิร์ฟพร้อมซอสสูตรพิเศษ',img:'https://picsum.photos/seed/food1/600/400'},
  {id:2,name:'สลัดปลาแซลมอน',price:220,desc:'แซลมอนสด เสิร์ฟพร้อมผักออร์แกนิค',img:'https://picsum.photos/seed/food2/600/400'},
  {id:3,name:'พาสต้าเห็ดทรัฟเฟิล',price:320,desc:'ครีมทรัฟเฟิลเข้มข้น',img:'https://picsum.photos/seed/food3/600/400'},
  {id:4,name:'ซูชิพรีเมียม 12 ชิ้น',price:480,desc:'ซูชิระดับพรีเมียม คัดปลาสด',img:'https://picsum.photos/seed/food4/600/400'},
  {id:5,name:'เค้กช็อกโกแลตลาวา',price:180,desc:'เค้กช็อกโกแลตไหลเยิ้ม',img:'https://picsum.photos/seed/food5/600/400'}
];

const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');

let cart = [];

function renderProducts(){
  productGrid.innerHTML = '';
  for(const p of PRODUCTS){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <div class="meta">${p.desc}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
        <div>
          <div class="price">฿${p.price}</div>
          <div class="meta">คะแนน: 100★</div>
        </div>
        <button class="btn" data-id="${p.id}">เพิ่มลงตะกร้า</button>
      </div>
    `;
    productGrid.appendChild(card);
  }
}

function updateCartCount(){
  const totalQty = cart.reduce((s,i)=>s+i.qty,0);
  cartCount.innerText = totalQty;
}

function addToCart(id){
  const prod = PRODUCTS.find(p=>p.id===id);
  if(!prod) return;
  const existing = cart.find(i=>i.id===id);
  if(existing) existing.qty++;
  else cart.push({id:prod.id,name:prod.name,price:prod.price,qty:1});
  updateCartCount();
}

function openCart(){
  cartModal.classList.remove('hidden');
  renderCartItems();
}

function closeCartModal(){
  cartModal.classList.add('hidden');
}

function renderCartItems(){
  cartItemsEl.innerHTML = '';
  if(cart.length===0){
    cartItemsEl.innerHTML = '<p class="meta">ตะกร้าว่าง</p>';
    cartTotalEl.innerText = '0';
    return;
  }
  let total = 0;
  for(const item of cart){
    total += item.price * item.qty;
    const row = document.createElement('div');
    row.style.display='flex';
    row.style.justifyContent='space-between';
    row.style.marginBottom='8px';
    row.innerHTML = `
      <div>
        <div style="font-weight:700">${item.name}</div>
        <div class="meta">฿${item.price} × ${item.qty}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn btn-muted" data-action="dec" data-id="${item.id}">-</button>
        <button class="btn" data-action="inc" data-id="${item.id}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
  }
  cartTotalEl.innerText = total;
}

// Events
productGrid.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const id = parseInt(btn.dataset.id);
  if(id) addToCart(id);
});

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartModal);

cartItemsEl.addEventListener('click',(e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const action = btn.dataset.action;
  const id = parseInt(btn.dataset.id);
  const item = cart.find(i=>i.id===id);
  if(!item) return;

  if(action==='inc') item.qty++;
  if(action==='dec'){
    item.qty--;
    if(item.qty<=0) cart = cart.filter(i=>i.id!==id);
  }
  updateCartCount();
  renderCartItems();
});

// initialize
renderProducts();
updateCartCount();
document.getElementById('year').innerText = new Date().getFullYear();

// Checkout placeholder
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  alert('ไปยังหน้าชำระเงิน (placeholder) — ปรับแต่งได้ตามระบบจริง');
});
