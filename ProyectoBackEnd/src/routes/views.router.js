import {Router} from "express";
import { __dirname } from "../utils.js";
import { getProducts } from "../Managers/ProductManager.js";

const router = Router();

router.get('/', async (req, res) =>{
    const products = await getProducts();
    res.render('home', {products})
});

router.get('/realtimeproducts', (req, res) =>{
    res.render('realtimeproducts')
});
export default router;