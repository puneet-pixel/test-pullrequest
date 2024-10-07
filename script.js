document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {id: 1, name: "Product 1", price: 28.45},
        {id: 2, name: "Product 2", price: 54.79},
        {id: 3, name: "Product 3", price: 68.78}
    ];

    const productList = document.getElementById('products-list')
    const cartItems = document.getElementById('cart-items')
    const emptyCart = document.getElementById('empty-cart')
    const cartTotal = document.getElementById('cart-total')
    const priceTotal = document.getElementById('total-price')
    const checkoutBtn = document.getElementById('checkout-btn')

    let cart = JSON.parse(localStorage.getItem('items')) || [] // i dont use const because i have to delte all the eleemnts of aa cart when checkout is done
    console.log(cart)
    updateCart()


    for(let i = 0; i < products.length; i++)renderProducts(products[i])

    function renderProducts(product){
        const li = document.createElement("li");
        li.innerHTML = `
        <span> ${product.name} 
        <br>
        <span class="product-price">Price: ${product.price}
        <button id="${product.id}" class="addToCart-btn">Add to Cart</button></span>
        </span>`

        productList.appendChild(li);

        li.querySelector('.addToCart-btn').addEventListener('click', (e) => {
            addToCart(product)
        })
    }

    
    function addToCart(product){
        //cart.push({id: 1, name: "Product 1", price: 28.45, count: 1})
        let flag = false;
        for(let i = 0; i < cart.length; i++){
            if(cart[i].id == product.id){
                cart[i].count = cart[i].count+1;
                flag = true;
            }
        }

        if(!flag){
            cart.push({id: product.id, name: product.name, price: product.price, count: 1})
        }
        console.log("All products")
        for(let i = 0; i < cart.length; i++){
            console.log(cart[i].name)
        }

        updateCart();
    }
    
    function updateCart(){
        resetCart();
        savetoLocalStorage();
        
        let totalPrice = 0;
        for(let i = 0; i < cart.length; i++){

            if(cart[i].name === undefined || cart[i].count === 0)continue;

            const li = document.createElement("li");
            li.innerHTML = `
            <span>${cart[i].name}
            <br>
            <span class="itemsInCart">Items: ${cart[i].count}
            <span class="priceTotal">Price: ${(cart[i].price*cart[i].count).toFixed(2)}
            <button class="remove-itemBtn">Remove</button></span>
            </span>`

            totalPrice += (cart[i].price*cart[i].count);
            cartItems.appendChild(li);
            
            li.querySelector('.remove-itemBtn').addEventListener('click', () => {

                cart[i].count = cart[i].count -1;
                if(cart[i].count === 0){
                    li.innerHTML = '';
                }

                updateCart();
            })
        }  

        if(totalPrice == 0){
            cartItems.innerHTML = `Your cart is empty!!`
        }     
        priceTotal.textContent = `$${totalPrice.toFixed(2)}`
    }

    // function deleteItems(productId){
    //     cart = cart.map(item => {
    //         if (item.id === productId) {
    //             item.count--;
    //             if (item.count === 0) {
    //                 return null; // Mark for removal
    //             }
    //         }
    //         return item;
    //     }).filter(item => item !== null); // Remove items marked for removal

    //     updateCart();
    // }

    function resetCart(){
        let price = 0;
        cartItems.innerHTML = '';//delete all thing to overwrite
        priceTotal.textContent = `$${price.toFixed(1)}`;
    }

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0 || cart.every(item => item.count === 0)) {
            alert("Your cart is empty. Please add items before checking out.");
            return;
        }
        alert("Checkout Successfully. Your order will be delivered within 4-5 days!");
        resetCart();
        cartItems.innerHTML = `Your cart is empty!!`
        cart = [];
        savetoLocalStorage()
    })

    function savetoLocalStorage(){
        localStorage.setItem('items', JSON.stringify(cart))
    }

})