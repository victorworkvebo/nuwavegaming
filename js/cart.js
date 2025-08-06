// Shopping Cart Manager for NuWave Gaming
class ShoppingCart {
    constructor() {
        this.cartKey = 'nuwavegaming_cart';
        this.cart = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartUI();
        this.addEventListeners();
        this.showCartIcon();
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem(this.cartKey);
        return saved ? JSON.parse(saved) : {
            items: [],
            total: 0,
            itemCount: 0
        };
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
        this.updateCartUI();
    }

    // Add item to cart
    addToCart(product) {
        const existingItem = this.cart.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.calculateTotals();
        this.saveCart();
        this.showAddedNotification(product);
    }

    // Remove item from cart
    removeFromCart(productId) {
        this.cart.items = this.cart.items.filter(item => item.id !== productId);
        this.calculateTotals();
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.cart.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.calculateTotals();
                this.saveCart();
            }
        }
    }

    // Calculate cart totals
    calculateTotals() {
        this.cart.total = this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cart.itemCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Show cart icon in header
    showCartIcon() {
        const header = document.querySelector('header .flex.items-center.gap-4');
        if (header && !document.getElementById('cart-icon')) {
            const cartIcon = document.createElement('button');
            cartIcon.id = 'cart-icon';
            cartIcon.className = 'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 w-9 border border-slate-700 bg-transparent hover:bg-slate-800 hover:text-slate-100';
            cartIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                </svg>
                <span id="cart-count" class="absolute -top-2 -right-2 bg-cyan-500 text-slate-950 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ${this.cart.itemCount === 0 ? 'hidden' : ''}">
                    ${this.cart.itemCount}
                </span>
            `;
            cartIcon.onclick = () => this.showCartModal();
            header.insertBefore(cartIcon, header.firstChild);
        }
    }

    // Update cart UI elements
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.itemCount;
            cartCount.classList.toggle('hidden', this.cart.itemCount === 0);
        }
    }

    // Show added to cart notification
    showAddedNotification(product) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
                <span><strong>${product.name}</strong> added to cart!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Show cart modal
    showCartModal() {
        this.hideCartModal();
        
        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4';
        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <div class="p-6 border-b border-slate-700">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-slate-100">Shopping Cart</h2>
                        <button id="close-cart" class="text-slate-400 hover:text-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="flex-1 overflow-y-auto p-6">
                    ${this.renderCartItems()}
                </div>
                
                ${this.cart.items.length > 0 ? `
                <div class="border-t border-slate-700 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-lg font-semibold text-slate-100">Total: $${this.cart.total.toFixed(2)}</span>
                        <span class="text-sm text-slate-400">${this.cart.itemCount} item${this.cart.itemCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="flex gap-3">
                        <button id="continue-shopping" class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
                            Continue Shopping
                        </button>
                        <button id="checkout-btn" class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                            Checkout
                        </button>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Hide cart modal
    hideCartModal() {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Render cart items
    renderCartItems() {
        if (this.cart.items.length === 0) {
            return `
                <div class="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-slate-600 mb-4">
                        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                    </svg>
                    <h3 class="text-lg font-semibold text-slate-300 mb-2">Your cart is empty</h3>
                    <p class="text-slate-400 mb-6">Add some gaming gear to get started!</p>
                    <button id="continue-shopping" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-6 bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                        Browse Products
                    </button>
                </div>
            `;
        }

        return `
            <div class="space-y-4">
                ${this.cart.items.map(item => `
                    <div class="flex items-center gap-4 p-4 border border-slate-700 rounded-lg">
                        <img src="${item.image || '/placeholder.svg?height=80&width=80'}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                        <div class="flex-1">
                            <h3 class="font-semibold text-slate-100">${item.name}</h3>
                            <p class="text-sm text-slate-400">${item.shortDescription || ''}</p>
                            <p class="text-lg font-bold text-cyan-400">$${item.price.toFixed(2)}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" class="w-8 h-8 rounded border border-slate-600 bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"></path>
                                </svg>
                            </button>
                            <span class="w-8 text-center text-slate-100">${item.quantity}</span>
                            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" class="w-8 h-8 rounded border border-slate-600 bg-slate-800 hover:bg-slate-700 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                            </button>
                            <button onclick="cart.removeFromCart('${item.id}')" class="ml-2 w-8 h-8 rounded border border-red-600 bg-red-600 hover:bg-red-700 flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Start checkout process
    startCheckout() {
        if (this.cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        this.hideCartModal();
        this.showCheckoutModal();
    }

    // Show checkout modal
    showCheckoutModal() {
        const modal = document.createElement('div');
        modal.id = 'checkout-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4';
        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-slate-700">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-slate-100">Checkout</h2>
                        <button id="close-checkout" class="text-slate-400 hover:text-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Checkout Form -->
                        <div>
                            <form id="checkout-form" class="space-y-6">
                                <div>
                                    <h3 class="text-lg font-semibold text-slate-100 mb-4">Shipping Information</h3>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-slate-200 mb-2">First Name</label>
                                            <input type="text" name="firstName" required class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-slate-200 mb-2">Last Name</label>
                                            <input type="text" name="lastName" required class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                        <label class="block text-sm font-medium text-slate-200 mb-2">Email</label>
                                        <input type="email" name="email" required class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                    </div>
                                    <div class="mt-4">
                                        <label class="block text-sm font-medium text-slate-200 mb-2">Address</label>
                                        <input type="text" name="address" required class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                    </div>
                                    <div class="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label class="block text-sm font-medium text-slate-200 mb-2">City</label>
                                            <input type="text" name="city" required class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-slate-200 mb-2">ZIP Code</label>
                                            <input type="text" name="zipCode" required class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 class="text-lg font-semibold text-slate-100 mb-4">Payment Method</h3>
                                    <div class="space-y-3">
                                        <div class="payment-option">
                                            <input type="radio" id="paypal" name="paymentMethod" value="paypal" class="sr-only" required>
                                            <label for="paypal" class="flex items-center p-4 border border-slate-700 rounded-lg cursor-pointer hover:border-cyan-500 transition-colors payment-option-label">
                                                <div class="flex items-center justify-between w-full">
                                                    <div class="flex items-center gap-3">
                                                        <div class="w-5 h-5 border-2 border-slate-600 rounded-full flex items-center justify-center">
                                                            <div class="w-2.5 h-2.5 bg-cyan-500 rounded-full hidden payment-radio-dot"></div>
                                                        </div>
                                                        <div>
                                                            <p class="text-slate-100 font-medium">PayPal</p>
                                                            <p class="text-sm text-slate-400">Pay securely with your PayPal account</p>
                                                        </div>
                                                    </div>
                                                    <div class="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">PayPal</div>
                                                </div>
                                            </label>
                                        </div>

                                        <div class="payment-option">
                                            <input type="radio" id="bank-transfer" name="paymentMethod" value="bank-transfer" class="sr-only">
                                            <label for="bank-transfer" class="flex items-center p-4 border border-slate-700 rounded-lg cursor-pointer hover:border-cyan-500 transition-colors payment-option-label">
                                                <div class="flex items-center justify-between w-full">
                                                    <div class="flex items-center gap-3">
                                                        <div class="w-5 h-5 border-2 border-slate-600 rounded-full flex items-center justify-center">
                                                            <div class="w-2.5 h-2.5 bg-cyan-500 rounded-full hidden payment-radio-dot"></div>
                                                        </div>
                                                        <div>
                                                            <p class="text-slate-100 font-medium">Bank Transfer</p>
                                                            <p class="text-sm text-slate-400">Direct bank transfer (3-5 business days)</p>
                                                        </div>
                                                    </div>
                                                    <div class="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">BANK</div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Payment Details Section (Initially Hidden) -->
                                    <div id="payment-details" class="mt-4 space-y-4 hidden">
                                        <!-- PayPal Details -->
                                        <div id="paypal-details" class="payment-details hidden">
                                            <div class="bg-slate-800 border border-slate-700 rounded-lg p-4">
                                                <div class="flex items-center gap-3 mb-3">
                                                    <div class="bg-blue-600 text-white p-2 rounded">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.9.9 0 0 0-.89.756l-1.195 7.583a.47.47 0 0 0 .465.549h3.514a.75.75 0 0 0 .741-.64l.543-3.44.034-.2a.75.75 0 0 1 .741-.64h.467c3.3 0 5.886-1.34 6.64-5.214.315-1.617.135-2.97-.83-3.934z"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p class="text-slate-100 font-medium">PayPal Checkout</p>
                                                        <p class="text-sm text-slate-400">You'll be redirected to PayPal to complete your payment</p>
                                                    </div>
                                                </div>
                                                <p class="text-xs text-slate-500">After clicking "Place Order", you'll be taken to PayPal's secure checkout page.</p>
                                            </div>
                                        </div>

                                        <!-- Bank Transfer Details -->
                                        <div id="bank-transfer-details" class="payment-details hidden">
                                            <div class="bg-slate-800 border border-slate-700 rounded-lg p-4">
                                                <div class="flex items-center gap-3 mb-4">
                                                    <div class="bg-green-600 text-white p-2 rounded">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                                                            <circle cx="12" cy="12" r="2"></circle>
                                                            <path d="M6 12h.01M18 12h.01"></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p class="text-slate-100 font-medium">Bank Transfer Instructions</p>
                                                        <p class="text-sm text-slate-400">Transfer funds directly to our bank account</p>
                                                    </div>
                                                </div>
                                                <div class="space-y-3 text-sm">
                                                    <div class="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p class="text-slate-400">Bank Name:</p>
                                                            <p class="text-slate-100 font-medium">NuWave Gaming Bank</p>
                                                        </div>
                                                        <div>
                                                            <p class="text-slate-400">Account Name:</p>
                                                            <p class="text-slate-100 font-medium">NuWave Gaming LLC</p>
                                                        </div>
                                                    </div>
                                                    <div class="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p class="text-slate-400">Account Number:</p>
                                                            <p class="text-slate-100 font-medium">1234567890</p>
                                                        </div>
                                                        <div>
                                                            <p class="text-slate-400">Routing Number:</p>
                                                            <p class="text-slate-100 font-medium">987654321</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p class="text-slate-400">Reference:</p>
                                                        <p class="text-slate-100 font-medium">Please include your order number in the transfer reference</p>
                                                    </div>
                                                </div>
                                                <div class="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded">
                                                    <p class="text-yellow-400 text-xs">
                                                        <strong>Important:</strong> Your order will be processed after we receive your payment (3-5 business days). 
                                                        You'll receive bank transfer instructions via email after placing your order.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!-- Order Summary -->
                        <div>
                            <h3 class="text-lg font-semibold text-slate-100 mb-4">Order Summary</h3>
                            <div class="bg-slate-800 rounded-lg p-4 space-y-4">
                                ${this.cart.items.map(item => `
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <p class="text-slate-100">${item.name}</p>
                                            <p class="text-sm text-slate-400">Qty: ${item.quantity}</p>
                                        </div>
                                        <p class="text-slate-100">$${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                `).join('')}
                                
                                <div class="border-t border-slate-700 pt-4">
                                    <div class="flex justify-between items-center mb-2">
                                        <p class="text-slate-300">Subtotal:</p>
                                        <p class="text-slate-100">$${this.cart.total.toFixed(2)}</p>
                                    </div>
                                    <div class="flex justify-between items-center mb-2">
                                        <p class="text-slate-300">Shipping:</p>
                                        <p class="text-slate-100">$${this.calculateShipping().toFixed(2)}</p>
                                    </div>
                                    <div class="flex justify-between items-center mb-2">
                                        <p class="text-slate-300">Tax:</p>
                                        <p class="text-slate-100">$${this.calculateTax().toFixed(2)}</p>
                                    </div>
                                    <div class="border-t border-slate-700 pt-2">
                                        <div class="flex justify-between items-center">
                                            <p class="text-lg font-semibold text-slate-100">Total:</p>
                                            <p class="text-lg font-semibold text-cyan-400">$${this.calculateFinalTotal().toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-6 space-y-3">
                                <button id="place-order" class="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-12 px-6 bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold">
                                    Place Order - $${this.calculateFinalTotal().toFixed(2)}
                                </button>
                                <button id="back-to-cart" class="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
                                    Back to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.addCheckoutEventListeners();
    }

    // Calculate shipping cost
    calculateShipping() {
        return this.cart.total > 100 ? 0 : 9.99;
    }

    // Calculate tax
    calculateTax() {
        return this.cart.total * 0.08; // 8% tax
    }

    // Calculate final total
    calculateFinalTotal() {
        return this.cart.total + this.calculateShipping() + this.calculateTax();
    }

    // Add checkout event listeners
    addCheckoutEventListeners() {
        // Add payment method selection listeners
        const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
        paymentOptions.forEach(option => {
            option.addEventListener('change', (e) => {
                this.handlePaymentMethodChange(e.target.value);
            });
        });
    }

    // Handle payment method selection
    handlePaymentMethodChange(method) {
        // Update radio button visual state
        document.querySelectorAll('.payment-option-label').forEach(label => {
            label.classList.remove('border-cyan-500', 'bg-slate-800');
            label.classList.add('border-slate-700');
            label.querySelector('.payment-radio-dot').classList.add('hidden');
        });
        
        const selectedLabel = document.querySelector(`label[for="${method}"]`);
        if (selectedLabel) {
            selectedLabel.classList.remove('border-slate-700');
            selectedLabel.classList.add('border-cyan-500', 'bg-slate-800');
            selectedLabel.querySelector('.payment-radio-dot').classList.remove('hidden');
        }

        // Show/hide payment details
        document.querySelectorAll('.payment-details').forEach(detail => {
            detail.classList.add('hidden');
        });
        
        const paymentDetails = document.getElementById('payment-details');
        if (method === 'paypal') {
            paymentDetails.classList.remove('hidden');
            document.getElementById('paypal-details').classList.remove('hidden');
        } else if (method === 'bank-transfer') {
            paymentDetails.classList.remove('hidden');
            document.getElementById('bank-transfer-details').classList.remove('hidden');
        } else {
            paymentDetails.classList.add('hidden');
        }
    }

    // Process order
    processOrder() {
        const form = document.getElementById('checkout-form');
        const formData = new FormData(form);
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Check if payment method is selected
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!paymentMethod) {
            alert('Please select a payment method');
            return;
        }

        // Show processing state
        const placeOrderBtn = document.getElementById('place-order');
        placeOrderBtn.disabled = true;
        
        if (paymentMethod.value === 'paypal') {
            placeOrderBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Redirecting to PayPal...
            `;
        } else if (paymentMethod.value === 'bank-transfer') {
            placeOrderBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Order...
            `;
        }

        // Simulate payment processing with different timing based on method
        const processingTime = paymentMethod.value === 'bank-transfer' ? 1000 : 2000;
        setTimeout(() => {
            this.completeOrder(formData, paymentMethod.value);
        }, processingTime);
    }

    // Complete order
    completeOrder(formData, paymentMethod) {
        const orderNumber = 'NW' + Date.now().toString().slice(-6);
        
        // Create order object
        const order = {
            orderNumber,
            items: [...this.cart.items],
            subtotal: this.cart.total,
            shipping: this.calculateShipping(),
            tax: this.calculateTax(),
            total: this.calculateFinalTotal(),
            paymentMethod: paymentMethod,
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                address: formData.get('address'),
                city: formData.get('city'),
                zipCode: formData.get('zipCode')
            },
            date: new Date().toISOString(),
            status: paymentMethod === 'bank-transfer' ? 'pending-payment' : 'confirmed'
        };

        // Save order to localStorage (in real app, send to server)
        const orders = JSON.parse(localStorage.getItem('nuwavegaming_orders') || '[]');
        orders.push(order);
        localStorage.setItem('nuwavegaming_orders', JSON.stringify(orders));

        // Clear cart
        this.cart = { items: [], total: 0, itemCount: 0 };
        this.saveCart();

        // Hide checkout modal
        document.getElementById('checkout-modal').remove();

        // Show success modal
        this.showOrderSuccess(order);
    }

    // Show order success modal
    showOrderSuccess(order) {
        const modal = document.createElement('div');
        modal.id = 'success-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4';
        
        let statusMessage = '';
        let statusColor = 'bg-green-600';
        
        if (order.paymentMethod === 'paypal') {
            statusMessage = 'Your PayPal payment has been processed successfully.';
        } else if (order.paymentMethod === 'bank-transfer') {
            statusMessage = 'Your order is confirmed. Please complete the bank transfer to process your order.';
            statusColor = 'bg-yellow-600';
        }
        
        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-md text-center p-8">
                <div class="w-16 h-16 ${statusColor} rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                </div>
                
                <h2 class="text-2xl font-bold text-slate-100 mb-2">Order ${order.status === 'pending-payment' ? 'Created' : 'Confirmed'}!</h2>
                <p class="text-slate-300 mb-4">${statusMessage}</p>
                
                <div class="bg-slate-800 rounded-lg p-4 mb-6">
                    <p class="text-sm text-slate-400 mb-1">Order Number</p>
                    <p class="text-lg font-bold text-cyan-400">${order.orderNumber}</p>
                    <p class="text-sm text-slate-400 mt-2">Payment Method</p>
                    <p class="text-slate-100 capitalize">${order.paymentMethod.replace('-', ' ')}</p>
                </div>
                
                ${order.paymentMethod === 'bank-transfer' ? `
                    <div class="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
                        <p class="text-yellow-400 text-sm">
                            <strong>Next Steps:</strong> Bank transfer instructions have been sent to your email. 
                            Your order will be processed once payment is received.
                        </p>
                    </div>
                ` : ''}
                
                <p class="text-sm text-slate-400 mb-6">
                    A confirmation email has been sent to <strong class="text-slate-300">${order.customer.email}</strong>
                </p>
                
                <div class="space-y-3">
                    <button onclick="this.closest('#success-modal').remove()" class="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                        Continue Shopping
                    </button>
                    <button onclick="cart.showOrderDetails('${order.orderNumber}')" class="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 border border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
                        View Order Details
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Show order details
    showOrderDetails(orderNumber) {
        const orders = JSON.parse(localStorage.getItem('nuwavegaming_orders') || '[]');
        const order = orders.find(o => o.orderNumber === orderNumber);
        
        if (!order) {
            alert('Order not found');
            return;
        }

        // Close success modal if open
        const successModal = document.getElementById('success-modal');
        if (successModal) successModal.remove();

        const modal = document.createElement('div');
        modal.id = 'order-details-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4';
        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-slate-700">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-slate-100">Order Details</h2>
                        <button onclick="this.closest('#order-details-modal').remove()" class="text-slate-400 hover:text-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-slate-400">Order Number</p>
                            <p class="text-lg font-bold text-cyan-400">${order.orderNumber}</p>
                        </div>
                        <div>
                            <p class="text-sm text-slate-400">Order Date</p>
                            <p class="text-slate-100">${new Date(order.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-slate-100 mb-3">Items Ordered</h3>
                        <div class="space-y-3">
                            ${order.items.map(item => `
                                <div class="flex justify-between items-center p-3 bg-slate-800 rounded">
                                    <div>
                                        <p class="text-slate-100">${item.name}</p>
                                        <p class="text-sm text-slate-400">Qty: ${item.quantity} × $${item.price.toFixed(2)}</p>
                                    </div>
                                    <p class="text-slate-100">$${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-slate-100 mb-3">Shipping Address</h3>
                        <div class="bg-slate-800 rounded p-3">
                            <p class="text-slate-100">${order.customer.firstName} ${order.customer.lastName}</p>
                            <p class="text-slate-300">${order.customer.address}</p>
                            <p class="text-slate-300">${order.customer.city}, ${order.customer.zipCode}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-slate-100 mb-3">Order Summary</h3>
                        <div class="bg-slate-800 rounded p-4 space-y-2">
                            <div class="flex justify-between">
                                <span class="text-slate-300">Subtotal:</span>
                                <span class="text-slate-100">$${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-300">Shipping:</span>
                                <span class="text-slate-100">$${order.shipping.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-300">Tax:</span>
                                <span class="text-slate-100">$${order.tax.toFixed(2)}</span>
                            </div>
                            <div class="border-t border-slate-700 pt-2">
                                <div class="flex justify-between">
                                    <span class="text-lg font-semibold text-slate-100">Total:</span>
                                    <span class="text-lg font-semibold text-cyan-400">$${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Add event listeners
    addEventListeners() {
        // Use event delegation for dynamically created elements
        document.addEventListener('click', (e) => {
            // Handle close buttons
            if (e.target.id === 'close-cart' || e.target.closest('#close-cart')) {
                this.hideCartModal();
            } else if (e.target.id === 'continue-shopping' || e.target.closest('#continue-shopping')) {
                this.hideCartModal();
            } else if (e.target.id === 'checkout-btn' || e.target.closest('#checkout-btn')) {
                this.startCheckout();
            } else if (e.target.id === 'close-checkout' || e.target.closest('#close-checkout')) {
                const checkoutModal = document.getElementById('checkout-modal');
                if (checkoutModal) checkoutModal.remove();
            } else if (e.target.id === 'place-order' || e.target.closest('#place-order')) {
                this.processOrder();
            } else if (e.target.id === 'back-to-cart' || e.target.closest('#back-to-cart')) {
                const checkoutModal = document.getElementById('checkout-modal');
                if (checkoutModal) checkoutModal.remove();
                this.showCartModal();
            }
            
            // Handle close buttons by checking if clicked element or its parent has close functionality
            if (e.target.closest('button')) {
                const button = e.target.closest('button');
                const modal = button.closest('.fixed.inset-0');
                
                // Check if this is a close button (has X icon or close text)
                if (button.innerHTML.includes('M18 6L6 18') || button.innerHTML.includes('M6 6l12 12')) {
                    if (modal) {
                        modal.remove();
                    }
                }
            }
        });

        // Close modals when clicking outside (on the backdrop)
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cart-modal') {
                this.hideCartModal();
            } else if (e.target.id === 'checkout-modal') {
                const checkoutModal = document.getElementById('checkout-modal');
                if (checkoutModal) checkoutModal.remove();
            } else if (e.target.id === 'success-modal') {
                const successModal = document.getElementById('success-modal');
                if (successModal) successModal.remove();
            } else if (e.target.id === 'order-details-modal') {
                const orderModal = document.getElementById('order-details-modal');
                if (orderModal) orderModal.remove();
            }
        });

        // Handle escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const cartModal = document.getElementById('cart-modal');
                const checkoutModal = document.getElementById('checkout-modal');
                const successModal = document.getElementById('success-modal');
                const orderModal = document.getElementById('order-details-modal');
                
                if (cartModal) this.hideCartModal();
                if (checkoutModal) checkoutModal.remove();
                if (successModal) successModal.remove();
                if (orderModal) orderModal.remove();
            }
        });
    }
}

// Product data
const productData = {
    'hyper-flux-headset': {
        id: 'hyper-flux-headset',
        name: 'Hyper-Flux Headset',
        price: 149.99,
        shortDescription: '7.1 surround sound with crystal-clear mic.',
        image: '/placeholder.svg?height=400&width=400'
    },
    'quantum-strike-keyboard': {
        id: 'quantum-strike-keyboard',
        name: 'Quantum-Strike Keyboard',
        price: 189.99,
        shortDescription: 'Optical switches for light-speed actuation.',
        image: '/placeholder.svg?height=400&width=400'
    },
    'gamma-pro-mouse': {
        id: 'gamma-pro-mouse',
        name: 'Gamma Pro Mouse',
        price: 89.99,
        shortDescription: 'Lightweight ergonomic design with 20K DPI sensor.',
        image: '/placeholder.svg?height=400&width=400'
    },
    'aether-glide-mousepad': {
        id: 'aether-glide-mousepad',
        name: 'Aether-Glide Mousepad',
        price: 39.99,
        shortDescription: 'Extended size with ultra-low friction surface.',
        image: '/placeholder.svg?height=400&width=400'
    },
    'chrono-stream-webcam': {
        id: 'chrono-stream-webcam',
        name: 'Chrono-Stream Webcam',
        price: 129.99,
        shortDescription: 'Crisp 1080p 60FPS for professional streaming.',
        image: '/placeholder.svg?height=400&width=400'
    },
    'vortex-cooling-stand': {
        id: 'vortex-cooling-stand',
        name: 'Vortex Cooling Stand',
        price: 59.99,
        shortDescription: 'Keep your laptop cool under pressure.',
        image: '/placeholder.svg?height=400&width=400'
    },
    'echo-pulse-speakers': {
        id: 'echo-pulse-speakers',
        name: 'Echo-Pulse Speakers',
        price: 99.99,
        shortDescription: '2.1 system with rich bass and clear highs.',
        image: '/placeholder.svg?height=400&width=400'
    },
    'guardian-controller': {
        id: 'guardian-controller',
        name: 'Guardian Controller',
        price: 79.99,
        shortDescription: 'Pro-grade controller with remappable paddles.',
        image: '/placeholder.svg?height=400&width=400'
    }
};

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});

// Global function to add product to cart
function addToCart(productId) {
    const product = productData[productId];
    if (product && window.cart) {
        window.cart.addToCart(product);
    }
}
