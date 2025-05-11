// API endpoints
const API = {
    DRESSES: '/dresses',
    USERS: '/users',
    CART: '/cart'
};

// State management
let currentSection = 'dresses';
let dresses = [];
let users = [];
let cartItems = [];
let currentUser = null; // For user editing

// DOM elements
const dressContainer = document.getElementById('dress-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const usersListContainer = document.getElementById('users-list');
const userForm = document.getElementById('user-form');
const modal = document.getElementById('dress-modal');
const closeButton = document.querySelector('.close-button');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data
    fetchDresses();
    fetchUsers();
    fetchCart();

    // Setup event listeners
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // User form submission
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveUser();
    });

    // Modal close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Section navigation
function showSection(sectionId) {
    currentSection = sectionId;
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Refresh data when switching sections
    if (sectionId === 'dresses') {
        fetchDresses();
    } else if (sectionId === 'cart') {
        fetchCart();
    } else if (sectionId === 'users') {
        fetchUsers();
    }
}

// Fetch all dresses
function fetchDresses() {
    fetch(API.DRESSES)
        .then(response => response.json())
        .then(data => {
            dresses = data;
            renderDresses();
        })
        .catch(error => {
            console.error('Error fetching dresses:', error);
            // For demo purposes, use hardcoded data if API fails
            useDemoData();
        });
}

// Fetch all users
function fetchUsers() {
    fetch(API.USERS)
        .then(response => response.json())
        .then(data => {
            users = data;
            renderUsers();
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            // For demo purposes, use hardcoded data if API fails
            useDemoUserData();
        });
}

// Fetch cart items
function fetchCart() {
    fetch(API.CART)
        .then(response => response.json())
        .then(data => {
            cartItems = data;
            resolveCartItems();
        })
        .catch(error => {
            console.error('Error fetching cart:', error);
            // For demo purposes, use hardcoded data if API fails
            useDemoCartData();
        });
}

// Resolve cart items with dress details
function resolveCartItems() {
    // If dresses aren't loaded yet, fetch them first
    if (dresses.length === 0) {
        fetch(API.DRESSES)
            .then(response => response.json())
            .then(data => {
                dresses = data;
                renderCart();
            })
            .catch(error => {
                console.error('Error fetching dresses for cart:', error);
                useDemoData();
                renderCart();
            });
    } else {
        renderCart();
    }
}

// Render dresses to the UI
function renderDresses() {
    dressContainer.innerHTML = '';
    
    dresses.forEach(dress => {
        const dressCard = document.createElement('div');
        dressCard.className = 'dress-card';
        
        // Use the uploaded image or a placeholder
        const imageUrl = dress.imageUrl ? `/images/${dress.imageUrl}` : 'https://via.placeholder.com/300x400?text=Dress+Image';
        
        dressCard.innerHTML = `
            <div class="dress-image" style="background-image: url('${imageUrl}')"></div>
            <div class="dress-info">
                <div class="dress-name">${dress.name}</div>
                <div class="dress-price">₹${dress.price.toFixed(2)}</div>
                <div class="dress-size">Size: ${dress.size}</div>
            </div>
            <div class="dress-actions">
                <button class="btn btn-view" onclick="viewDressDetails(${dress.id})">View</button>
                <button class="btn btn-add" onclick="addToCart(${dress.id})">Add to Cart</button>
            </div>
        `;
        
        dressContainer.appendChild(dressCard);
    });
}

// View dress details
function viewDressDetails(dressId) {
    const dress = dresses.find(d => d.id === dressId);
    if (!dress) return;
    
    // Use the uploaded image or a placeholder
    const imageUrl = dress.imageUrl ? `/images/${dress.imageUrl}` : 'https://via.placeholder.com/300x400?text=Dress+Image';
    
    const detailsHtml = `
        <img src="${imageUrl}" alt="${dress.name}" class="detail-image">
        <div class="detail-info">
            <h3>${dress.name}</h3>
            <p><strong>Price:</strong> ₹${dress.price.toFixed(2)}</p>
            <p><strong>Size:</strong> ${dress.size}</p>
            <p><strong>Color:</strong> ${dress.color}</p>
            <p><strong>In Stock:</strong> ${dress.quantity}</p>
            <p><strong>Description:</strong> ${dress.description}</p>
            <button class="btn btn-add" onclick="addToCart(${dress.id}); modal.style.display='none';">Add to Cart</button>
        </div>
    `;
    
    document.getElementById('dress-details').innerHTML = detailsHtml;
    modal.style.display = 'block';
}

// Add dress to cart
function addToCart(dressId) {
    const dress = dresses.find(d => d.id === dressId);
    if (!dress) return;
    
    // If we already have this item in cart, increase quantity
    const existingCartItem = cartItems.find(item => item.dressId === dressId);
    
    if (existingCartItem) {
        // Update quantity
        existingCartItem.quantity += 1;
        
        // Update in backend
        fetch(`${API.CART}/${existingCartItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(existingCartItem)
        })
        .then(response => {
            fetchCart(); // Refresh cart
        })
        .catch(error => {
            console.error('Error updating cart:', error);
            // For demo, just refresh the cart with our local data
            renderCart();
        });
    } else {
        // Add new item to cart
        const newCartItem = {
            userId: 1, // Default user for demo
            dressId: dressId,
            quantity: 1
        };
        
        fetch(API.CART, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCartItem)
        })
        .then(response => {
            fetchCart(); // Refresh cart
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
            // For demo, add locally and refresh
            cartItems.push({...newCartItem, id: Date.now()}); // Mock ID
            renderCart();
        });
    }
    
    // Show feedback
    alert(`Added ${dress.name} to cart!`);
}

// Render cart to the UI
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cartItems.forEach(item => {
        const dress = dresses.find(d => d.id === item.dressId);
        if (!dress) return;
        
        const itemTotal = dress.price * item.quantity;
        total += itemTotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dress.name}</td>
            <td>₹${dress.price.toFixed(2)}</td>
            <td>
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                ${item.quantity}
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </td>
            <td>₹${itemTotal.toFixed(2)}</td>
            <td class="cart-actions">
                <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </td>
        `;
        
        cartItemsContainer.appendChild(row);
    });
    
    // Update cart total
    cartTotalElement.textContent = total.toFixed(2);
    
    // Display message if cart is empty
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5" style="text-align: center;">Your cart is empty</td></tr>';
    }
}

// Update cart item quantity
function updateCartQuantity(cartId, newQuantity) {
    // Don't allow negative quantities
    if (newQuantity <= 0) {
        removeFromCart(cartId);
        return;
    }
    
    const item = cartItems.find(i => i.id === cartId);
    if (!item) return;
    
    item.quantity = newQuantity;
    
    // Update in backend
    fetch(`${API.CART}/${cartId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
    .then(response => {
        fetchCart(); // Refresh cart
    })
    .catch(error => {
        console.error('Error updating cart quantity:', error);
        // For demo, just refresh with local data
        renderCart();
    });
}

// Remove item from cart
function removeFromCart(cartId) {
    fetch(`${API.CART}/${cartId}`, {
        method: 'DELETE'
    })
    .then(response => {
        fetchCart(); // Refresh cart
    })
    .catch(error => {
        console.error('Error removing from cart:', error);
        // For demo, remove locally and refresh
        cartItems = cartItems.filter(item => item.id !== cartId);
        renderCart();
    });
}

// Render users to the UI
function renderUsers() {
    usersListContainer.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.age}</td>
            <td>${user.mailId}</td>
            <td class="user-actions">
                <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
                <button class="btn-remove" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        
        usersListContainer.appendChild(row);
    });
    
    // Display message if no users
    if (users.length === 0) {
        usersListContainer.innerHTML = '<tr><td colspan="5" style="text-align: center;">No users found</td></tr>';
    }
}

// Edit user
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    // Fill form with user data
    document.getElementById('user-id').value = user.id;
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-phone').value = user.phoneNumber;
    document.getElementById('user-age').value = user.age;
    document.getElementById('user-email').value = user.mailId;
    
    // Store current user for reference
    currentUser = user;
}

// Save user (create or update)
function saveUser() {
    const userId = document.getElementById('user-id').value;
    const user = {
        name: document.getElementById('user-name').value,
        phoneNumber: document.getElementById('user-phone').value,
        age: parseInt(document.getElementById('user-age').value),
        mailId: document.getElementById('user-email').value
    };
    
    // Determine if this is an update or create
    const isUpdate = userId !== '';
    
    if (isUpdate) {
        // Update existing user
        user.id = parseInt(userId);
        
        fetch(`${API.USERS}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            resetUserForm();
            fetchUsers(); // Refresh users
        })
        .catch(error => {
            console.error('Error updating user:', error);
            // For demo, update local data and refresh
            const index = users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                users[index] = user;
            }
            renderUsers();
            resetUserForm();
        });
    } else {
        // Create new user
        fetch(API.USERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            resetUserForm();
            fetchUsers(); // Refresh users
        })
        .catch(error => {
            console.error('Error creating user:', error);
            // For demo, add to local data and refresh
            user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            users.push(user);
            renderUsers();
            resetUserForm();
        });
    }
}

// Delete user
function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    fetch(`${API.USERS}/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        fetchUsers(); // Refresh users
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        // For demo, remove from local data and refresh
        users = users.filter(user => user.id !== userId);
        renderUsers();
    });
}

// Reset user form
function resetUserForm() {
    document.getElementById('user-id').value = '';
    document.getElementById('user-name').value = '';
    document.getElementById('user-phone').value = '';
    document.getElementById('user-age').value = '';
    document.getElementById('user-email').value = '';
    currentUser = null;
}

// Demo data (for when API calls fail)
function useDemoData() {
    dresses = [
        {id: 1, name: 'Lace Dress', description: 'Beautiful lace dress for parties', price: 1200.00, size: 'M', color: 'Brown', quantity: 5, imageUrl: 'lace.jpg'},
        {id: 2, name: 'Maxi Dress', description: 'Rainbow maxi for summer', price: 1800.00, size: 'L', color: 'Multi', quantity: 4, imageUrl: 'maxi.jpg'},
        {id: 3, name: 'Men Jacket', description: 'Stylish maroon jacket for winter', price: 2500.00, size: 'XL', color: 'Maroon', quantity: 6, imageUrl: 'men8.jpg'},
        {id: 4, name: 'White Top', description: 'Trendy white top for casual wear', price: 850.00, size: 'S', color: 'White', quantity: 10, imageUrl: 'w.jpg'},
        {id: 5, name: 'Floral Dress', description: 'Printed floral dress perfect for outings', price: 1500.00, size: 'M', color: 'White/Black', quantity: 7, imageUrl: 'w1.jpg'},
        {id: 6, name: 'Green Shirt', description: 'Formal green shirt for women', price: 1300.00, size: 'M', color: 'Green', quantity: 8, imageUrl: 'w2.jpg'}
    ];
    
    renderDresses();
}

function useDemoUserData() {
    users = [
        {id: 1, name: 'Priya Dharshini', phoneNumber: '9876543210', age: 23, mailId: 'priya@example.com'},
        {id: 2, name: 'Rahul Sharma', phoneNumber: '9123456780', age: 28, mailId: 'rahul@example.com'},
        {id: 3, name: 'Anjali Mehta', phoneNumber: '9001234567', age: 25, mailId: 'anjali@example.com'},
        {id: 4, name: 'Vikram Kumar', phoneNumber: '8899776655', age: 30, mailId: 'vikram@example.com'}
    ];
    
    renderUsers();
}
function useDemoCartData() {
    cartItems = [
        {id: 1, userId: 1, dressId: 1, quantity: 2},
        {id: 2, userId: 1, dressId: 3, quantity: 1},
        {id: 3, userId: 2, dressId: 5, quantity: 3}
    ];
    
    renderCart();
}

// Calculate cart totals and update UI
function updateCartTotal() {
    let total = 0;
    
    cartItems.forEach(item => {
        const dress = dresses.find(d => d.id === item.dressId);
        if (dress) {
            total += dress.price * item.quantity;
        }
    });
    
    cartTotalElement.textContent = total.toFixed(2);
}

// Function to checkout cart
function checkoutCart() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // In a real app, this would redirect to a payment page
    // For demo purposes, just clear the cart
    fetch(API.CART + '/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 1 }) // Default user for demo
    })
    .then(response => {
        alert('Thank you for your purchase!');
        cartItems = [];
        renderCart();
    })
    .catch(error => {
        console.error('Error during checkout:', error);
        // For demo, just clear the cart
        alert('Thank you for your purchase!');
        cartItems = [];
        renderCart();
    });
}

// Validate user form inputs
function validateUserForm() {
    const name = document.getElementById('user-name').value;
    const phone = document.getElementById('user-phone').value;
    const age = document.getElementById('user-age').value;
    const email = document.getElementById('user-email').value;
    
    if (!name || !phone || !age || !email) {
        alert('All fields are required!');
        return false;
    }
    
    // Basic phone validation
    if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Age validation
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
        alert('Please enter a valid age between 18 and 100');
        return false;
    }
    
    return true;
}

// Add checkout button to cart section
function addCartButtons() {
    const cartSummary = document.getElementById('cart-summary');
    if (cartSummary) {
        const checkoutBtn = document.createElement('button');
        checkoutBtn.className = 'btn btn-add';
        checkoutBtn.textContent = 'Checkout';
        checkoutBtn.onclick = checkoutCart;
        cartSummary.appendChild(checkoutBtn);
    }
}

// Filter dresses by search term
function searchDresses(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    
    const filteredDresses = dresses.filter(dress => 
        dress.name.toLowerCase().includes(searchTerm) || 
        dress.description.toLowerCase().includes(searchTerm) ||
        dress.size.toLowerCase().includes(searchTerm) ||
        dress.color.toLowerCase().includes(searchTerm)
    );
    
    // Temporarily replace dresses with filtered results and render
    const originalDresses = [...dresses];
    dresses = filteredDresses;
    renderDresses();
    dresses = originalDresses; // Restore original dresses array
}

// Add search functionality to the dresses section
function addSearchField() {
    const dressesSection = document.getElementById('dresses');
    const dressesGrid = document.getElementById('dress-container');
    
    // Create search input
    const searchDiv = document.createElement('div');
    searchDiv.className = 'search-container';
    searchDiv.innerHTML = `
        <input type="text" id="dress-search" placeholder="Search dresses...">
        <button id="search-button">Search</button>
    `;
    
    // Insert search before the grid
    dressesSection.insertBefore(searchDiv, dressesGrid);
    
    // Add event listener
    document.getElementById('search-button').addEventListener('click', () => {
        const searchTerm = document.getElementById('dress-search').value;
        searchDresses(searchTerm);
    });
    
    // Add keyup event for enter key
    document.getElementById('dress-search').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = document.getElementById('dress-search').value;
            searchDresses(searchTerm);
        }
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    // Add checkout button to cart
    addCartButtons();
    
    // Add search functionality
    addSearchField();
    
    // Add form validation
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateUserForm()) {
            saveUser();
        }
    });
    
    // Add sort functionality for dresses
    addSortOptions();
});

// Add sorting options for dresses
function addSortOptions() {
    const dressesSection = document.getElementById('dresses');
    const searchContainer = dressesSection.querySelector('.search-container') || dressesSection.firstElementChild;
    
    // Create sort dropdown
    const sortDiv = document.createElement('div');
    sortDiv.className = 'sort-container';
    sortDiv.innerHTML = `
        <label for="sort-option">Sort by: </label>
        <select id="sort-option">
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="size">Size</option>
        </select>
    `;
    
    // Insert after search or before grid
    if (searchContainer) {
        searchContainer.appendChild(sortDiv);
    } else {
        const dressesGrid = document.getElementById('dress-container');
        dressesSection.insertBefore(sortDiv, dressesGrid);
    }
    
    // Add event listener
    document.getElementById('sort-option').addEventListener('change', (e) => {
        sortDresses(e.target.value);
    });
}

// Sort dresses based on option
function sortDresses(sortOption) {
    const sortedDresses = [...dresses];
    
    switch (sortOption) {
        case 'name':
            sortedDresses.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedDresses.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedDresses.sort((a, b) => b.price - a.price);
            break;
        case 'size':
            // Convert size to number for sorting (S=1, M=2, L=3, XL=4)
            const sizeValue = (size) => {
                switch(size) {
                    case 'S': return 1;
                    case 'M': return 2;
                    case 'L': return 3;
                    case 'XL': return 4;
                    default: return 5;
                }
            };
            sortedDresses.sort((a, b) => sizeValue(a.size) - sizeValue(b.size));
            break;
    }
    
    // Temporarily replace dresses with sorted results and render
    const originalDresses = [...dresses];
    dresses = sortedDresses;
    renderDresses();
    dresses = originalDresses; // Restore original dresses array
}

// Filter dresses by size and color
function filterDresses(sizeFilter, colorFilter) {
    let filteredDresses = [...dresses];
    
    if (sizeFilter && sizeFilter !== 'all') {
        filteredDresses = filteredDresses.filter(dress => dress.size === sizeFilter);
    }
    
    if (colorFilter && colorFilter !== 'all') {
        filteredDresses = filteredDresses.filter(dress => dress.color.toLowerCase().includes(colorFilter.toLowerCase()));
    }
    
    // Temporarily replace dresses with filtered results and render
    const originalDresses = [...dresses];
    dresses = filteredDresses;
    renderDresses();
    dresses = originalDresses; // Restore original dresses array
}

// Function to get available colors and sizes for filters
function getFiltersOptions() {
    const sizes = new Set();
    const colors = new Set();
    
    dresses.forEach(dress => {
        sizes.add(dress.size);
        colors.add(dress.color);
    });
    
    return {
        sizes: Array.from(sizes),
        colors: Array.from(colors)
    };
}

// Add filter functionality
function addFilterOptions() {
    const dressesSection = document.getElementById('dresses');
    const searchContainer = dressesSection.querySelector('.search-container');
    
    const { sizes, colors } = getFiltersOptions();
    
    // Create filter container
    const filterDiv = document.createElement('div');
    filterDiv.className = 'filter-container';
    
    // Create size filter
    const sizeFilter = document.createElement('div');
    sizeFilter.className = 'filter-group';
    
    let sizeOptions = '<option value="all">All Sizes</option>';
    sizes.forEach(size => {
        sizeOptions += `<option value="${size}">${size}</option>`;
    });
    
    sizeFilter.innerHTML = `
        <label for="size-filter">Size: </label>
        <select id="size-filter">
            ${sizeOptions}
        </select>
    `;
    
    // Create color filter
    const colorFilter = document.createElement('div');
    colorFilter.className = 'filter-group';
    
    let colorOptions = '<option value="all">All Colors</option>';
    colors.forEach(color => {
        colorOptions += `<option value="${color}">${color}</option>`;
    });
    
    colorFilter.innerHTML = `
        <label for="color-filter">Color: </label>
        <select id="color-filter">
            ${colorOptions}
        </select>
    `;
    
    // Add filters to container
    filterDiv.appendChild(sizeFilter);
    filterDiv.appendChild(colorFilter);
    
    // Add apply filter button
    const applyBtn = document.createElement('button');
    applyBtn.className = 'btn-filter';
    applyBtn.textContent = 'Apply Filters';
    filterDiv.appendChild(applyBtn);
    
    // Insert after search
    if (searchContainer) {
        searchContainer.after(filterDiv);
    } else {
        const dressesGrid = document.getElementById('dress-container');
        dressesSection.insertBefore(filterDiv, dressesGrid);
    }
    
    // Add event listener for apply button
    applyBtn.addEventListener('click', () => {
        const sizeValue = document.getElementById('size-filter').value;
        const colorValue = document.getElementById('color-filter').value;
        filterDresses(sizeValue, colorValue);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    // Add filter functionality (add this to the existing DOMContentLoaded)
    addFilterOptions();
});
