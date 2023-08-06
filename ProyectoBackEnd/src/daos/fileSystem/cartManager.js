import fs from "fs";
import { __dirname } from "../../utils.js";
import { getProductById } from "./productManager.js";
const pathFile = __dirname + "/db/carts.json";

export const getMaxId = async () => {
    let maxId = 0;
    const cart = await getCarts();
    cart.map((c) => {
        if (Number(c.id) > maxId) {
            maxId = Number(c.id);
        }
    });
    return maxId;
};

export const newCart = async () => {
    const carts = await getCarts();
    let newCart = {
        id: (await getMaxId()) + 1,
        products: [],
    };
    carts.push(newCart);
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return newCart;
};

export const getCarts = async () => {
    const carts = await fs.promises.readFile(pathFile, "utf-8");
    const parsedCarts = await JSON.parse(carts ? carts : "[]");
    return parsedCarts;
};

export const getCartById = async (id) => {
    const carts = await getCarts();
    return carts.find((c) => c.id === id);
};

export const saveProductToCart = async (idCart, idProduct) => {
    const carts = await getCarts();
    const cart = carts.find((c) => c.id === idCart);
    const product = await getProductById(idProduct);
    if (product) {
        if (cart) {
            const cartProduct = cart.products.find(
                (prod) =>prod.id === idProduct);
            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                const prod = {
                    id: idProduct,
                    quantity: 1,
                };
                cart.products.push(prod);
            }
            await fs.promises.writeFile(pathFile, JSON.stringify(carts));
            return cart;
        } else {
            throw new Error("cart not found");
        }
    } else {
        throw new Error("product not found");
    }
};

export const deleteCart = async (id) => {
    const productList = await getProducts();
    productList.splice(findProductIndex(productList, id), 1);
    await fs.promises.writeFile(pathFile, JSON.stringify(productList));
    return productList;
};

export const findCartIndex = async (products, id) => {
    return products.findIndex((prod) => prod.id === id);
};
