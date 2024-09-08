// Créez une classe d’objet pour le produit
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

const product1 = new Product(1100500, 'Laptop', 1500);
const product2 = new Product(1200500, 'TV', 2500);

console.log(product1); 
console.log(product2); 

// Créez une classe d’objet pour l’élément du panier
class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    
    // Méthode pour calculer le prix total de l'article
    totalPrice() {
        return this.product.price * this.quantity;
    }
}

const cartItem1 = new CartItem(product1, 2); // Passez l'objet product1, pas product1.name
const cartItem2 = new CartItem(product2, 1); // Passez l'objet product2, pas product2.name

console.log(cartItem1); 
console.log(cartItem2); 
console.log(cartItem1.totalPrice()); 
console.log(cartItem2.totalPrice()); 

// Créez une autre classe d’objet pour le panier avec remise
class DiscountedCartItem extends CartItem {
    constructor(product, quantity, discount) {
        super(product, quantity); // Appelle de la classe parente
        // Ajoute un attribut pour la remise
        this.discount = discount; 
    }

    // Méthode pour calculer le prix total après remise
    totalPrice() {
        const originalTotal = super.totalPrice();
        return originalTotal - (originalTotal * this.discount / 100);
    }
}

const discountedCartItem = new DiscountedCartItem(product1, 2, 10);

console.log(discountedCartItem);
console.log(discountedCartItem.totalPrice());

// Créez une classe d’objet pour le panier
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Méthode pour ajouter un article au panier
    addItem(cartItem) {
        const existingItem = this.items.findIndex(item => item.product.id === cartItem.product.id);
        if (existingItem > -1) {
            // Met à jour la quantité si l'article existe déjà
            this.items[existingItem].quantity += cartItem.quantity;
        } else {
            // Ajoute un nouvel article au panier
            this.items.push(cartItem);
        }
    }

    // Méthode pour supprimer un article du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Méthode pour obtenir le total des articles dans le panier
    getTotal() {
        return this.items.reduce((total, item) => total + item.totalPrice(), 0);
    }

    // Méthode pour afficher les articles du panier
    displayItems() {
        this.items.forEach(item => {
            console.log(`Produit: ${item.product.name}, Quantité: ${item.quantity}, Prix Total: ${item.totalPrice()}`);
        });
    }
}
const cart = new ShoppingCart();

cart.addItem(cartItem1);
cart.addItem(cartItem2);

console.log("Contenu du panier :");

cart.displayItems();

console.log(`Total du panier : ${cart.getTotal()}`);


cart.removeItem(product1.id);

console.log("Contenu du panier après suppression :");
cart.displayItems();

console.log(`Total du panier après suppression : ${cart.getTotal()}`);