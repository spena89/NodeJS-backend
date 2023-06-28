import fs from "fs";
import { __dirname } from "../utils.js";
import { getProductById } from "./ProductManager.js";
const pathFile = __dirname + "/db/carts.json";

export const getMaxId = async () => {
    const MaxId = 0;
    const cart = await getCarts();
    cart.map((c) => {
        if (c.id > MaxId) MaxId = c.id;
    });
    return MaxId;
};

// Creates product if fields are not null and if the code is unique. Pushes it to products array
export const newCart = async () => {
    try {
        const cartsFile = await getCarts();
        const newCart = {
            id: (await getMaxId()) + 1,
            products: [],
        };
        cartsFile.push(newCart);
        await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
        return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const getCarts = async () => {
    try {
        if (fs.existsSync(pathFile)) {
            const carts = await fs.promises.readFile(pathFile, "utf-8");
            if(carts){
                const cartsJS = await JSON.parse(carts);
                return cartsJS;
            }else{
            return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export const getCartById = async (id) => {
    try {
        const cartsFile = await getCarts();
        const cartFound = await cartsFile.find((c) => c.id === id);
        return cartFound ? cartFound : "Not found";
    } catch (error) {
        console.log(error);
    }
};

export const saveProductToCart = async (idCart, idProduct) => {
    try {
        const cartList = await getCarts();
        const cartExist = await getCartById(idCart);
        const prodIdExists = await getProductById(idProduct);
        if (prodIdExists) {
            if (cartExist) {
                const productExistInCart = cartExist.products.find(
                    (prod) => prod.id === idProduct
                );
                if (productExistInCart) {
                    productExistInCart.quantity + 1;
                } else {
                    const prod = {
                        id: idProduct,
                        quantity: 1,
                    };
                    cartExist.products.push(prod);
                }
                await fs.promises.writeFile(pathFile, JSON.stringify(cartList));
                return cartExist;
            }else{
                return "Cart not found";
            }
        } else {
            return "product not found";
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteCart = async (id) => {
    try {
        const productList = await getProducts();
        productList.splice(findProductIndex(productList, id), 1);
        await fs.promises.writeFile(pathFile, JSON.stringify(productList));
        return productList;
    } catch (error) {
        return error;
    }
};

export const findCartIndex = async (products, id) => {
    try {
        return products.findIndex((prod) => prod.id === id);
    } catch (error) {
        return error;
    }
};
