// --- 1. GLOBAL STATE & THEME ---
const themeToggleBtn = document.getElementById('theme-btn');
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// --- 2. PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1500);
    }
    injectSharedUI();
});

// --- 3. MENU DATA ---
const baseMenu = [
    { id: 1, cat: "veg", name: "Paneer Butter Masala", price: 280, img: "https://placehold.co/400x300/FFD700/000000?text=Paneer+Butter+Masala", desc: "Rich & creamy paneer curry." },
    { id: 2, cat: "veg", name: "Mix Veg Curry", price: 220, img: "https://placehold.co/400x300/FFD700/000000?text=Mix+Veg", desc: "Seasonal vegetables cooked in Indian spices." },
    { id: 3, cat: "veg", name: "Malai Kofta", price: 300, img: "https://placehold.co/400x300/FFD700/000000?text=Malai+Kofta", desc: "Potato and paneer balls in sweet cream gravy." },
    { id: 4, cat: "veg", name: "Palak Paneer", price: 260, img: "https://placehold.co/400x300/FFD700/000000?text=Palak+Paneer", desc: "Paneer cubes in pureed spinach." },
    { id: 5, cat: "veg", name: "Dal Makhani", price: 240, img: "https://placehold.co/400x300/FFD700/000000?text=Dal+Makhani", desc: "Slow-cooked black lentils." },
    { id: 6, cat: "non-veg", name: "Butter Chicken", price: 350, img: "https://placehold.co/400x300/FFD700/000000?text=Butter+Chicken", desc: "Classic tender chicken in rich tomato gravy." },
    { id: 7, cat: "non-veg", name: "Chicken Tikka Masala", price: 360, img: "https://placehold.co/400x300/FFD700/000000?text=Chicken+Tikka", desc: "Roasted chicken chunks in spicy sauce." },
    { id: 8, cat: "non-veg", name: "Mutton Rogan Josh", price: 450, img: "https://placehold.co/400x300/FFD700/000000?text=Mutton+Curry", desc: "Aromatic lamb dish of Persian origin." },
    { id: 9, cat: "non-veg", name: "Amritsari Fish Fry", price: 380, img: "https://placehold.co/400x300/FFD700/000000?text=Fish+Fry", desc: "Crispy battered fish." },
    { id: 10, cat: "non-veg", name: "Hyderabadi Chicken Biryani", price: 320, img: "https://placehold.co/400x300/FFD700/000000?text=Chicken+Biryani", desc: "Fragrant rice and chicken." },
    { id: 11, cat: "burgers", name: "Classic Veg Burger", price: 120, img: "https://placehold.co/400x300/FFD700/000000?text=Veg+Burger", desc: "Potato patty with fresh veggies." },
    { id: 12, cat: "burgers", name: "Double Cheese Burger", price: 180, img: "https://placehold.co/400x300/FFD700/000000?text=Cheese+Burger", desc: "Extra cheese, double flavor." },
    { id: 13, cat: "burgers", name: "Crispy Chicken Burger", price: 200, img: "https://placehold.co/400x300/FFD700/000000?text=Chicken+Burger", desc: "Fried chicken breast with mayo." },
    { id: 14, cat: "burgers", name: "BBQ Mutton Burger", price: 250, img: "https://placehold.co/400x300/FFD700/000000?text=BBQ+Burger", desc: "Juicy mutton patty with BBQ sauce." },
    { id: 15, cat: "burgers", name: "Spicy Paneer Burger", price: 160, img: "https://placehold.co/400x300/FFD700/000000?text=Paneer+Burger", desc: "Grilled spicy paneer block." },
    { id: 16, cat: "thali", name: "Mini Veg Thali", price: 150, img: "https://placehold.co/400x300/FFD700/000000?text=Mini+Thali", desc: "Dal, Sabzi, 2 Roti, Rice." },
    { id: 17, cat: "thali", name: "Deluxe Veg Thali", price: 280, img: "https://placehold.co/400x300/FFD700/000000?text=Deluxe+Veg+Thali", desc: "Paneer, Dal, 2 Sabzi, Pulao, Sweet." },
    { id: 18, cat: "thali", name: "Royal Non-Veg Thali", price: 350, img: "https://placehold.co/400x300/FFD700/000000?text=Non-Veg+Thali", desc: "Chicken Curry, Dry Mutton, Rice, Roti." },
    { id: 19, cat: "thali", name: "Maharaja Thali", price: 450, img: "https://placehold.co/400x300/FFD700/000000?text=Maharaja+Thali", desc: "The ultimate feast. Serves 2." },
    { id: 20, cat: "thali", name: "Student Thali", price: 100, img: "https://placehold.co/400x300/FFD700/000000?text=Student+Thali", desc: "Budget-friendly complete meal." },
    { id: 21, cat: "drinks", name: "Mango Lassi", price: 90, img: "https://placehold.co/400x300/FFD700/000000?text=Mango+Lassi", desc: "Sweet yoghurt drink." },
    { id: 22, cat: "drinks", name: "Sweet Punjabi Lassi", price: 80, img: "https://placehold.co/400x300/FFD700/000000?text=Sweet+Lassi", desc: "Served in a traditional clay cup." },
    { id: 23, cat: "drinks", name: "Fresh Lime Soda", price: 60, img: "https://placehold.co/400x300/FFD700/000000?text=Lime+Soda", desc: "Refreshing summer cooler." },
    { id: 24, cat: "drinks", name: "Cold Coffee with Ice Cream", price: 120, img: "https://placehold.co/400x300/FFD700/000000?text=Cold+Coffee", desc: "Thick coffee shake." },
    { id: 25, cat: "drinks", name: "Virgin Mojito", price: 110, img: "https://placehold.co/400x300/FFD700/000000?text=Virgin+Mojito", desc: "Mint, lime, and fizz." }
];

if (!localStorage.getItem('menuItems')) {
    localStorage.setItem('menuItems', JSON.stringify(baseMenu));
}

// --- 4. ADVANCED CART & ORDER SYSTEM ---
let cart = [];

function renderMenu(filter = 'all') {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;
    
    const items = JSON.parse(localStorage.getItem('menuItems'));
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        if (filter === 'all' || item.cat === filter) {
            menuGrid.innerHTML += `
                <div class="card">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="card-content">
                        <div class="card-title">${item.name}</div>
                        <div class="card-price">₹${item.price}</div>
                        <div class="card-desc">${item.desc}</div>
                        <button class="btn" onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                    </div>
                </div>
            `;
        }
    });
}

if(document.getElementById('menu-grid')) { renderMenu(); }

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    toggleCartSidebar(true);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    if (cart.length === 0) {
        toggleCartSidebar(false);
    }
}

function toggleCartSidebar(forceOpen = null) {
    const sidebar = document.getElementById('cart-sidebar');
    if(!sidebar) return;
    if (forceOpen === true) {
        sidebar.classList.add('open');
    } else if (forceOpen === false) {
        sidebar.classList.remove('open');
    } else {
        sidebar.classList.toggle('open');
    }
}

function updateCartUI() {
    const floatingCart = document.getElementById('floating-cart');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const sidebarItems = document.getElementById('cart-items-list');
    const sidebarTotal = document.getElementById('sidebar-total');
    
    let total = 0;
    if(sidebarItems) sidebarItems.innerHTML = '';

    if (cart.length === 0) {
        if(sidebarItems) sidebarItems.innerHTML = '<p style="text-align:center; color:var(--grey); margin-top:20px;">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            if(sidebarItems) {
                sidebarItems.innerHTML += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <b>${item.name}</b>
                            <small>₹${item.price}</small>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
            }
        });
    }

    if(cart.length > 0) {
        if(floatingCart) floatingCart.classList.add('show');
        if(cartCount) cartCount.innerText = cart.length;
        if(cartTotal) cartTotal.innerText = total;
        if(sidebarTotal) sidebarTotal.innerText = `₹${total}`;
    } else {
        if(floatingCart) floatingCart.classList.remove('show');
        if(sidebarTotal) sidebarTotal.innerText = `₹0`;
    }
}

function openProcessing() {
    if(cart.length === 0) return;
    toggleCartSidebar(false);
    const modal = document.getElementById('checkout-modal');
    const content = document.getElementById('checkout-content');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    content.innerHTML = `
        <h2>Process Order</h2>
        <p>Total Items: ${cart.length} | Grand Total: ₹${total}</p>
        <div class="modal-options">
            <button class="btn" onclick="showDineIn()">🍽️ Dine-In</button>
            <button class="btn btn-outline" onclick="showOnline()">🛵 Online Order</button>
        </div>
        <button class="btn btn-outline" style="margin-top: 15px; width: 100%; border-color: red; color: red;" onclick="closeModal()">Cancel</button>
    `;
    modal.classList.add('active');
}

function showDineIn() {
    const content = document.getElementById('checkout-content');
    content.innerHTML = `
        <h2>Select Payment Method</h2>
        <div class="modal-options" style="flex-wrap: wrap;">
            <button class="btn" onclick="completeOrder('Cash')">💵 Cash</button>
            <button class="btn" onclick="completeOrder('UPI')">📱 UPI</button>
            <button class="btn" onclick="completeOrder('Credit Card')">💳 Credit Card</button>
            <button class="btn" onclick="completeOrder('Debit Card')">💳 Debit Card</button>
        </div>
        <button class="btn btn-outline" style="margin-top: 15px; width: 100%;" onclick="openProcessing()">⬅ Back</button>
    `;
}

function showOnline() {
    const content = document.getElementById('checkout-content');
    content.innerHTML = `
        <h2>Choose Delivery Partner</h2>
        <div class="modal-options">
            <button class="btn" style="background:#fc8019; color:white; border:none;" onclick="window.open('https://www.swiggy.com', '_blank')">Swiggy</button>
            <button class="btn" style="background:#e23744; color:white; border:none;" onclick="window.open('https://www.zomato.com', '_blank')">Zomato</button>
        </div>
        <button class="btn btn-outline" style="margin-top: 15px; width: 100%;" onclick="openProcessing()">⬅ Back</button>
    `;
}

// THE NEW, ANIMATED CHECKOUT FLOW
function completeOrder(method) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // 1. Prepare the exact WhatsApp Message containing their food
    let orderDetails = cart.map(item => `👉 ${item.name} (₹${item.price})`).join('%0A');
    let waMessage = `*🚨 NEW DINE-IN ORDER!*%0A*Payment Method:* ${method}%0A*Total Amount:* ₹${total}%0A%0A*Order Items:*%0A${orderDetails}`;
    
    // Replace this with the restaurant owner's WhatsApp number
    let ownerNumber = "919876543210"; 
    let waLink = `https://wa.me/${ownerNumber}?text=${waMessage}`;

    // Grab the modal content box
    const content = document.getElementById('checkout-content');
    
    // 2. Show the "Processing" Animation
    content.innerHTML = `
        <h2>Processing Payment...</h2>
        <div class="spinner" style="margin: 30px auto;"></div>
        <p style="color: var(--grey); font-weight: bold;">Securely processing your ${method} transaction...</p>
    `;

    // 3. Wait 2.5 seconds, then show the Success Screen & Ask to Send Message
    setTimeout(() => {
        content.innerHTML = `
            <h2 style="color: #25D366;">✅ Payment Successful!</h2>
            <div style="font-size: 5rem; margin: 15px 0; animation: pulse 1.5s infinite;">🧑‍🍳</div>
            <h3 style="color: var(--primary);">Preparing your order...</h3>
            <p style="margin-top: 15px; font-size: 1.1rem; line-height: 1.6;">
                In <strong>25 minutes</strong> your order will be completed and you can take your food!
            </p>
            
            <div style="background: rgba(37, 211, 102, 0.1); border: 2px solid #25D366; padding: 15px; border-radius: 10px; margin-top: 25px;">
                <p style="margin-bottom: 10px; font-weight: bold; color: var(--text);">Please send your order details to the kitchen so they can start cooking!</p>
                <a href="${waLink}" target="_blank" class="btn" style="background: #25D366; color: white; display: block; width: 100%; font-size: 1.1rem;" onclick="finishOrder()">💬 Send Order to Kitchen</a>
            </div>
            
            <button class="btn btn-outline" style="margin-top: 15px; width: 100%;" onclick="finishOrder()">Skip & Return to Menu</button>
        `;
    }, 2500);
}

// Helper function to clear cart and close modal after they click the button
function finishOrder() {
    cart = [];
    updateCartUI();
    closeModal();
}

function closeModal() {
    document.getElementById('checkout-modal').classList.remove('active');
}

// --- 5. SHARED UI INJECTION ---
function injectSharedUI() {
    const uiHTML = `
        <div class="floating-cart" id="floating-cart" onclick="toggleCartSidebar(true)" style="cursor:pointer;">
            <div class="cart-info">🛒 <span id="cart-count">0</span> Items | ₹<span id="cart-total">0</span></div>
            <button class="btn process-btn" onclick="event.stopPropagation(); openProcessing()">Processing ➔</button>
        </div>

        <div class="cart-sidebar" id="cart-sidebar">
            <div class="cart-header">
                <span>🛒 Your Order</span>
                <button onclick="toggleCartSidebar(false)">✖</button>
            </div>
            <div class="cart-items-container" id="cart-items-list">
                </div>
            <div class="cart-footer">
                <h3>Total: <span id="sidebar-total">₹0</span></h3>
                <button class="btn" style="width: 100%; font-size: 1.1rem; padding: 15px;" onclick="openProcessing()">Process Order</button>
            </div>
        </div>

        <div class="modal-overlay" id="checkout-modal">
            <div class="modal" id="checkout-content"></div>
        </div>

        <div class="chatbot-btn" onclick="toggleChat()">🤖</div>
        <div class="chatbot-window" id="chat-window">
            <div class="chat-header"><span>AI Assistant</span><span style="cursor:pointer" onclick="toggleChat()">✖</span></div>
            <div class="chat-body" id="chat-body"><div class="chat-msg bot-msg">Hello! Ask me about Offers, Events, or Food Suggestions.</div></div>
            <div class="chat-input"><input type="text" id="chat-input-field" placeholder="Type a message..."><button onclick="sendChat()">Send</button></div>
        </div>

        <div class="fake-popup" id="fake-popup">Someone from Mumbai just ordered <b>Butter Chicken</b>!</div>
        
        <a href="https://wa.me/1234567890" target="_blank" class="floating-wa">💬</a>
    `;
    document.body.insertAdjacentHTML('beforeend', uiHTML);
    startFakeOrders();
}

// --- 6. CHATBOT LOGIC ---
function toggleChat() {
    const chat = document.getElementById('chat-window');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function sendChat() {
    const input = document.getElementById('chat-input-field');
    const msg = input.value.trim().toLowerCase();
    if (!msg) return;
    appendMsg(input.value, 'user-msg');
    input.value = '';

    setTimeout(() => {
        let reply = "I'm not sure. Try asking about 'offers', 'events', or 'menu'.";
        if (msg.includes('offer')) reply = "Check our Offers page! Today: 20% off > ₹600. Tomorrow: 50% off > ₹999!";
        if (msg.includes('event')) reply = "🎉 New Year Event: Get 20% OFF on 4-person meals!";
        if (msg.includes('suggest') || msg.includes('food')) reply = "I highly recommend our signature Butter Chicken!";
        appendMsg(reply, 'bot-msg');
    }, 600);
}

function appendMsg(text, className) {
    const body = document.getElementById('chat-body');
    body.innerHTML += `<div class="chat-msg ${className}">${text}</div>`;
    body.scrollTop = body.scrollHeight;
}

// --- 7. FAKE LIVE ORDERS ---
function startFakeOrders() {
    const dishes = ['Paneer Butter Masala', 'Maharaja Thali', 'Classic Veg Burger', 'Chicken Biryani'];
    const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune'];
    setInterval(() => {
        const popup = document.getElementById('fake-popup');
        if(!popup) return;
        popup.innerHTML = `Someone from ${cities[Math.floor(Math.random() * cities.length)]} just ordered <b>${dishes[Math.floor(Math.random() * dishes.length)]}</b>!`;
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 4000);
    }, 15000);
}

// --- 8. AUTHENTICATION SYSTEM ---
function toggleAuth(mode) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const btnLogin = document.getElementById('btn-show-login');
    const btnRegister = document.getElementById('btn-show-register');

    if (mode === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        btnLogin.className = 'btn';
        btnRegister.className = 'btn btn-outline';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        btnLogin.className = 'btn btn-outline';
        btnRegister.className = 'btn';
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const phone = document.getElementById('reg-phone').value;
    const address = document.getElementById('reg-address').value;
    const password = document.getElementById('reg-password').value;

    let users = JSON.parse(localStorage.getItem('restaurantUsers')) || {};

    if (users[phone] || phone === 'admin@restaurant.com') {
        alert("❌ An account with this ID already exists!");
        return;
    }

    users[phone] = { name, address, password };
    localStorage.setItem('restaurantUsers', JSON.stringify(users));
    
    alert("✅ Registration Successful! You can now log in.");
    toggleAuth('login');
    document.getElementById('register-form').reset();
}

function handleLogin(e) {
    e.preventDefault();
    const loginId = document.getElementById('login-phone').value.trim(); // Phone OR Email
    const password = document.getElementById('login-password').value;

    // Admin Check
    if (loginId === 'admin@restaurant.com' && password === 'SuperSecret123!') {
        localStorage.setItem('activeSession', JSON.stringify({ role: 'admin', name: 'Restaurant Owner' }));
        alert("👨‍💼 Welcome back, Admin!");
        window.location.href = 'admin.html';
        return;
    }

    // Customer Check
    let users = JSON.parse(localStorage.getItem('restaurantUsers')) || {};
    if (users[loginId] && users[loginId].password === password) {
        localStorage.setItem('activeSession', JSON.stringify({ role: 'customer', name: users[loginId].name, address: users[loginId].address }));
        alert(`✅ Welcome back, ${users[loginId].name}!`);
        window.location.href = 'index.html';
    } else {
        alert("❌ Invalid credentials!");
    }
}

// --- 9. RESERVATION ---
function submitReservation(e) {
    e.preventDefault();
    const text = `Reservation at SAMPLE RESTAURANT for ${document.getElementById('res-people').value} people on ${document.getElementById('res-date').value}.`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(text)}`, '_blank');
}
