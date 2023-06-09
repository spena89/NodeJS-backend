const fs = requiere('fs');

class ProductManager {

    
    #id = 0;
    constructor(path){
        this.products = [];
        asdasd
        this.path= path;
    }
    // Creates product if fields are not null and if the code is unique. Pushes it to products array
    addProduct(title, description, price, thumbnail, code, stock){
        if(title !=null && description !=null &&
           price != null && thumbnail !=null &&
           code != null && stock !=null){
           
            let verifyCode = this.products.find(prod=>prod.code === code);

            if(!verifyCode){
                this.#id+=1
                    const product = {
                    title,
                    description,
                    price,
                    thumbnail,
                    id: this.#id,
                    code,
                    stock
                }
                this.products.push(product);
                return product;

            }else{
                console.log("addProduct --> el código ya existe en el array de productos");
                return null;
            }
        }
        
                
    }
    
    getProducts(){
        return this.products;

    }


    getProductById(id){
        let productFound = this.products.find(prod=>prod.id === id);
        return productFound ? productFound: null ;
    }
}




/*      Test Cases

let pm = new ProductManager();
pm.addProduct("titulo1","descripcion1",256,"thumbnail1",1,10);
pm.addProduct("titulo2","descripcion2",256,"thumbnail2",2,10);
pm.addProduct("titulo1","descripcion1",256,"thumbnail1",1,10);
console.log(pm.getProductById(1));
console.log(pm.getProductById(2));
console.log(pm.getProductById(24));
console.log(pm.getProducts());

        End Test Cases      */

