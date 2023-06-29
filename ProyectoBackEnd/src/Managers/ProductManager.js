import fs from 'fs';
import {__dirname} from '../utils.js';
const pathFile = __dirname + "/db/products.json";

    export const getMaxId = async ()=>{
        const MaxId = 0;
        const products = await getProducts();
        products.map((prod) => {
            if(prod.id > MaxId) MaxId = prod.id
        })
        return MaxId;
        }
    
    // Creates product if fields are not null and if the code is unique. Pushes it to products array
    export const addProduct = async (title, description, price, thumbnails, code, stock) => {
        try {
            if (
                title != null &&
                description != null &&
                price != null &&
                code != null &&
                stock != null
            ) {
                const productsFile = await getProducts();
                const verifyCode = productsFile.find(
                    (prod) => prod.code === code
                );

                if (!verifyCode) {
                    const product = {
                        title,
                        description,
                        price,
                        status:true,
                        stock,
                        category,
                        thumbnails,
                        id: await getMaxId() + 1,
                        code,
                    };
                    productsFile.push(product);
                    await fs.promises.writeFile(
                        pathFile,
                        JSON.stringify(productsFile))
                    
                }
                
            }

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    export const getProducts = async () => {
        try {
            if (fs.existsSync(pathFile)) {
                const products = await fs.promises.readFile(pathFile, "utf-8");
                const productsJS = JSON.parse(products);
                return productsJS;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    export const getProductById = async (id) => {
        try {
            const products = await getProducts();
            const productFound = await products.find(
                (prod) => prod.id === id
            );
            return productFound ? productFound : false; // TODO: return same type
        } catch (error) {
            console.log(error); // TODO: throw or handle, else remove
        }
    }

    export const updateProduct = async (id, product) => {
        try {
            const productList = await getProducts();
            const productIndex = await findProductIndex(productList, id);
            const productToUpdate = productList[productIndex];
            if (productToUpdate) {
                productToUpdate = {...productToUpdate, ...product}
                fs.writeFile(
                    pathFile,
                     JSON.stringify(productList), (err) =>{ if(err) throw new Error ('id not found');}
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    export const deleteProduct = async (id) => {
        try {
            const productList = await getProducts();
            productList.splice(findProductIndex(productList, id), 1);
            await fs.promises.writeFile(
                pathFile,
                JSON.stringify(productList)
            );
            return productList;
        } catch (error) {
            return error;
        }
    }

    export const findProductIndex = async (products, id) => {
        try {
            return products.findIndex((prod) => prod.id === id);
        } catch (error) {
            return error;
        }
    }

