const socketClient = io();

const prodForm = document.getElementById('prodForm');
const inputTitle = document.getElementById('title');
const inputDesc = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCat = document.getElementById('category');

prodForm.onsubmit = (send) => {
    send.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDesc.value,
        code: inputCode.value,
        price: inputPrice.value,
        stock: inputStock.value,
        category: inputCat.value
    }
    console.log(newProduct);
    socketClient.emit('newProduct', newProduct);
}