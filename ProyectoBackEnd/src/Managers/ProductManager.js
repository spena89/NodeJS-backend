import fs from "fs";
import { __dirname } from "../utils.js";
const pathFile = __dirname + "/db/products.json";

export const getMaxId = async () => {
    const MaxId = 0;
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
    stock
) => {
    if (
        title === null &&
        description === null &&
        price === null &&
        code === null &&
        stock === null
    ) {
        throw new Error ('one or more parameters are null or empty');
    }
        const products = await getProducts();
        const product = products.find((prod) => prod.code === code);
        if (!product) {
            const product = {
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
            products.push(product);
            await fs.promises.writeFile(pathFile, JSON.stringify(products));
        }else{
            throw new Error ('product alredy exists');
        }
    };

export const getProducts = async () => {
        const products = await fs.promises.readFile(pathFile, "utf-8");
        return JSON.parse(products);
};

export const getProductById = async (id) => {
    const products = await getProducts();
    return  products.find((prod) => prod.id === id);
};

export const updateProduct = async (id, product) => {
    const productList = await getProducts();
    const productIndex = await findProductIndex(productList, id);
    const productToUpdate = productList[productIndex];
    if (productToUpdate) {
        productToUpdate = { ...productToUpdate, ...product };
        fs.writeFile(pathFile, JSON.stringify(productList));
    }else{
        throw new Error ('id not found in product list')
    }
};

export const deleteProduct = async (id) => {
    const productList = await getProducts();
    productList.splice(findProductIndex(productList, id), 1);
    await fs.promises.writeFile(pathFile, JSON.stringify(productList));
    return productList;
};

export const findProductIndex = async (products, id) => {
    return products.findIndex((prod) => prod.id === id);
};
