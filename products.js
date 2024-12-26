const productList = [
    { name: "Helado moon",      price: 235000,      discount: 0 ,   special: 0 },
    { name: "Pika Burger",      price: 135000,      discount: 0 ,   special: 0 },
    { name: "Luna Burger",      price: 135000,      discount: 0 ,   special: 0 },
    { name: "Lata pichu",       price: 125000,      discount: 0 ,   special: 0 },
    { name: "Lata jigglypuff",  price: 125000,      discount: 0 ,   special: 0 },
    { name: "Onigiri Naruto",   price: 150000,      discount: 0 ,   special: 0 },
    { name: "Pika bento",       price: 150000,      discount: 0 ,   special: 0 },
    { name: "Mario bento",      price: 150000,      discount: 0 ,   special: 0 },
    { name: "Mario burger",     price: 150000,      discount: 0 ,   special: 0 },
    { name: "Lata squirtle",    price: 135000,      discount: 0 ,   special: 0 },
    { name: "Lata magikarp",    price: 135000,      discount: 0 ,   special: 0 },
    { name: "Lata togepi",      price: 135000,      discount: 0 ,   special: 0 },
    { name: "Jigglypuff drink", price: 120000,      discount: 0 ,   special: 0 },
    { name: "Kirby drink",      price: 120000,      discount: 0 ,   special: 0 },
    { name: "Gengar drink",     price: 100000,      discount: 0,    special: 0 },
    { name: "Mana drink",       price: 110000,      discount: 0,    special: 0 },
    { name: "Psyduck drink",    price: 110000,      discount: 0,    special: 0 },
    { name: "Baby oda drink",  price: 120000,       discount: 0,    special: 0 },
    { name: "Cajita Coin",      price: 3000000,     discount: 40,   special: 1 }
];

const 
    selectProducts = document.getElementById("products"),
    inputCount = document.getElementById("count"),
    buttomAdd = document.getElementById("add-to-cart"),
    cartList = document.getElementById("cart-list"),
    totalCart = document.getElementById('total-buy'),
    buttomDiscount = document.getElementById('discount-add'),
    buttomClearCart = document.getElementById('cart-clear'),
    buttomQuitDiscount = document.getElementById('discount-clear');


let total = 0;
let descuento = 0;
let totalproductos = 0;

let discountApplied = false;

productList.forEach((producto) => {
    const opcion = document.createElement("option"); // Creamos una nueva opción
    opcion.value = producto.name; // Asignamos el name como valor
    opcion.textContent = `${producto.name} ($${producto.price.toLocaleString()})`; // Texto que se verá en el select
    opcion.dataset.price = producto.price; // Guardamos el price como un atributo adicional
    selectProducts.appendChild(opcion); // Agregamos la opción al <select>
});

function addToCart(){
    const 
        count = inputCount.value,
        price = parseFloat(selectProducts.options[selectProducts.selectedIndex].dataset.price),
        subtotal = count * price,
        subtotal_round = Math.round(subtotal * 100)/100;
    
    let total_discount = 0;

    const itemCarrito = document.createElement('li');
    itemCarrito.innerHTML = `${count} x ${selectProducts.value} = $${subtotal_round.toLocaleString()}`;
    cartList.appendChild(itemCarrito);

    total += subtotal;
    total_discount = total - descuento;

    if(discountApplied){
        
        totalCart.innerHTML = `Total(40% descontado): ${total_discount.toLocaleString()}`;
    }else{
        
        totalCart.innerHTML = `Total: ${total.toLocaleString()}`;
    } 
    totalproductos = totalproductos + count;
    inputCount.value = 1;
}

function addCartDiscount(){
    if(totalproductos > 0){
        if(!discountApplied) {
            descuento = total * 0.4;
            total -= descuento;
            totalCart.innerHTML = `Total(40% descuento): $${total.toLocaleString()}`;
            discountApplied = true;
        }
    }
}
function clearCartList(){

    clearCartDiscount();
    cartList.innerHTML = '';
    total = 0;
    totalCart.innerHTML = `Aún no se ha agregado ningún producto.`;
    totalproductos = 0;

}

function clearCartDiscount(){

    total += descuento;
    descuento = 0;
    totalCart.innerHTML = `Total: $${total.toLocaleString()}`;
    discountApplied = false;
}

buttomAdd.addEventListener('click', addToCart);

buttomClearCart.addEventListener('click', clearCartList);

buttomQuitDiscount.addEventListener('click', clearCartDiscount);

buttomDiscount.addEventListener('click', addCartDiscount);
