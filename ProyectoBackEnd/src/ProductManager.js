import fs from 'fs';


export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async #getMaxId(){
        const MaxId = 0;
        const products = await this.getProducts();
        products.map((prod) => {
            if(prod.id > MaxId) MaxId = prod.id
        })
        return MaxId;
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
                const verifyCode = productsFile.find(
                    (prod) => prod.code === code
                );

                if (!verifyCode) {
                    const product = {
                        title,
                        description,
                        price,
                        thumbnail,
                        id: await this.#getMaxId() + 1,
                        code,
                        stock,
                    };
                    productsFile.push(product);
                    await fs.promises.writeFile(
                        this.path,
                        JSON.stringify(productsFile))
                    
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
            const productFound = await products.find(
                (prod) => prod.id === id
            );
            return productFound ? productFound : false;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, product) {
        try {
            const productList = await this.getProducts();
            const productIndex = await this.findProductIndex(productList, id);
            const productToUpdate = productList[productIndex];
            if (productToUpdate) {
                productToUpdate = {...productToUpdate, ...product}
                fs.writeFile(
                    this.path,
                     JSON.stringify(productList), (err) =>{ if(err) throw new Error ('id not found');}
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const productList = await this.getProducts();
            productList.splice(this.findProductIndex(productList, id), 1);
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


let pm = new ProductManager("../products.json");
let test = async () => {
    let lala = await pm.addProduct("asdd", "asad", 20333, "assdd", 1111, 22222)
    let asd = await pm.addProduct("234", "234", 234, "234", 234, 122343)
    let productis = await pm.getProducts();
    console.log(productis);
};

test();

