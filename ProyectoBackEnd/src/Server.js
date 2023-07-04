import express from 'express';
import productRouter from './routes/product.router.js' 
import cartRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { __dirname } from "./utils.js";

const app = express();

//reconoce info que llega desde el body y url
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.listen(8080, ()=>{
    console.log('server listening on port 8080');
})