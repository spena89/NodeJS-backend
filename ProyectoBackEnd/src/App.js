import express from 'express';
import productManager from './ProductManager.js';


const app = express();

//reconoce info que llega desde el body y url
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const pm = new productManager('./products.json');

app.get('/products', async (req, res)=>{
    try {
        const {limit} = req.query;
        const products = await pm.getProducts();
        const productList = [];
        if(limit){
            for(let i=0; i < limit; i++){
                if(products[i]){
                    productList.push(products[i]);
                }
            }
            res.status(200).json(productList);
        }else{
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.get('/products/:pid', async(req, res)=>{
try {
    const {pid} = req.params;
    const product = await pm.getProductById(Number(pid));
    if(product){
        res.json(product);
    }else{
        res.status(404).json({message: 'Product not found'});
    }
} catch (error) {
    res.status(500).json({message: error.message});
}})

app.listen(8080, ()=>{
    console.log('server listening on port 8080');
})