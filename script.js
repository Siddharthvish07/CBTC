const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1499,
      image: "https://via.placeholder.com/200x160?text=Headphones"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2999,
      image: "https://via.placeholder.com/200x160?text=Smart+Watch"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 1799,
      image: "https://via.placeholder.com/200x160?text=Speaker"
    },
    {
      id: 4,
      name: "Laptop Stand",
      price: 799,
      image: "https://via.placeholder.com/200x160?text=Laptop+Stand"
    }
  ];
  
  // Load products to the page
  function loadProducts() {
    const container = document.getElementById('product-container');
    if (!container) return; // exit if not on products.html
  
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      container.appendChild(card);
    });
  }
  
  // Add product to cart (localStorage)
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  }
  
  // Load products only on products.html
  document.addEventListener('DOMContentLoaded', loadProducts);
  // Load cart items on cart.html
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItemsContainer) return;
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let total = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotal.textContent = '0';
      return;
    }
  
    cart.forEach((productId, index) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="cart-item-details">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(item);
        total += product.price;
      }
    });
  
    cartTotal.textContent = total;
  }
  
  // Remove item from cart
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // remove 1 item at given index
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // reload cart
  }
  
  // Checkout (just demo)
  function checkout() {
    alert("Thank you for shopping with EmporifyX! (Checkout functionality coming soon)");
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  }
  
  // Load only on cart.html
  document.addEventListener('DOMContentLoaded', loadCartItems);
  function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      alert("Username already exists!");
      return false;
    }
  
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful! You can now login.");
    window.location.href = "login.html";
    return false;
  }
  
  // Login User
  function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
  
    if (user) {
      localStorage.setItem('loggedInUser', username);
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials!");
    }
    return false;
  }
  function trackOrder(event) {
    event.preventDefault();
    const orderId = document.getElementById('order-id').value;
    const resultBox = document.getElementById('tracking-result');
  
    // Simulate fake tracking statuses
    const statuses = [
      "Order Placed ✔",
      "Packed ✔",
      "Shipped ✔",
      "Out for Delivery ✔",
      "Delivered ✅"
    ];
  
    let html = `<h3>Tracking Status for Order ID: <span style="color:#004aad">${orderId}</span></h3><ul style="text-align:left;">`;
    statuses.forEach(status => {
      html += `<li>📦 ${status}</li>`;
    });
    html += `</ul>`;
  
    resultBox.innerHTML = html;
    document.getElementById('order-id').value = '';
    return false;
  }