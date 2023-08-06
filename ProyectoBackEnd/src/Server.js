import express from "express";
import productRouter from "./routes/product.router.js";
import {errorHandler} from "../src/middlewares/errorHandler.js"
import morgan from 'morgan';
import './daos/mongodb/connection.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)
app.use(morgan('dev'))

app.use('/api/products', productRouter);

app.listen(8080, () => {
    console.log("server listening on port 8080");
});
