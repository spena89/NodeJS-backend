const fs = require("fs");

class ProductManager {
    #id = 0;

    constructor(path) {
        this.path = path;
    }

    // Creates product if fields are not null and if the code is unique. Pushes it to products array
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (
                title != null &&
                description != null &&
                price != null &&
                thumbnail != null &&
                code != null &&
                stock != null
            ) {
                const productsFile = await this.getProducts();
                let verifyCode = productsFile.find(
                    (prod) => prod.code === code
                );

                if (!verifyCode) {
                    this.#id = this.#id + 1;
                    const product = {
                        title,
                        description,
                        price,
                        thumbnail,
                        id: this.#id,
                        code,
                        stock,
                    };
                    productsFile.push(product);
                    await fs.promises.writeFile(
                        this.path,
                        JSON.stringify(productsFile)
                    );
                    return product;
                }
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                const productsJS = JSON.parse(products);
                return productsJS;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            let productFound = await products.find(
                (prod) => prod.id === id
            );
            return productFound ? productFound : null;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, product) {
        try {
            const productList = await this.getProducts();
            const productIndex = this.findProductIndex(productList, id);
            const productToUpdate = productList[productIndex];
            if (productToUpdate) {
                productToUpdate = {...productToUpdate, ...product}
                fs.writeFile(
                    this.path,
                     JSON.stringify(productList), (err) =>{ if(err) throw err}
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const productList = await this.getProducts();
            productList.splice(findProductIndex(productList, id), 1);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(productList)
            );
            return productList;
        } catch (error) {
            return error;
        }
    }

    async findProductIndex(products, id) {
        try {
            return products.findIndex((prod) => prod.id === id);
        } catch (error) {
            return error;
        }
    }
}


let pm = new ProductManager("./products.json");
const test = async () => {
    const update = await pm.updateProduct(1, {title: "prueba de titulo"})
    console.log(update);
};

test();

