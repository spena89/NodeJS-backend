import fs from "fs";
import { __dirname } from "../utils.js";
const pathFile = __dirname + "/db/products.json";

export const getMaxId = async () => {
    let MaxId = 0;
    const products = await getProducts();
    products.map((prod) => {
        if (prod.id > MaxId) MaxId = prod.id;
    });
    return MaxId;
};

// Creates product if fields are not null and if the code is unique. Pushes it to products array
export const addProduct = async (
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    category
) => {
    if (!title || !description || !price || !code || !stock) {
        throw new Error("one or more parameters are null or empty");
    }
    const products = await getProducts();
    const product = products.find((prod) => prod.code === code);
    if (!product) {
        const newProduct = {
            title,
            description,
            price,
            status: true,
            stock,
            category,
            thumbnails,
            id: (await getMaxId()) + 1,
            code,
        };
        products.push(newProduct);
        await fs.promises.writeFile(pathFile, JSON.stringify(products));
        return newProduct;
    } else {
        throw new Error("product alredy exists");
    }
};

export const getProducts = async () => {
    const products = await fs.promises.readFile(pathFile, "utf-8");
    return JSON.parse(products);
};

export const getProductById = async (id) => {
    const products = await getProducts();
    return products.find((prod) => prod.id === id);
};

export const updateProduct = async (id, product) => {
    const productList = await getProducts();
    const productIndex = await findProductIndex(productList, id);
    const productToUpdate = productList[productIndex];
    if (productToUpdate) {
        productList[productIndex] = { ...productToUpdate, ...product };
        await fs.promises.writeFile(pathFile, JSON.stringify(productList));
        return productList[productIndex];
    } else {
        throw new Error("id not found in product list");
    }
};

export const deleteProduct = async (id) => {
    const productList = await getProducts();
    const productIndex = findProductIndex(productList, id);
    productList.splice(productIndex, 1);
    await fs.promises.writeFile(pathFile, JSON.stringify(productList));
    return productList;
};

export const findProductIndex = (products, id) => {
    return products.findIndex((prod) => prod.id === Number(id));
};
