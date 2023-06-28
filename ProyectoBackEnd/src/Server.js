import express from 'express';
import productRouter from './routes/product.router.js' 
import cartRouter from './routes/carts.router.js';

const app = express();

//reconoce info que llega desde el body y url
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.listen(8080, ()=>{
    console.log('server listening on port 8080');
})