import { Router } from "express";
import { __dirname } from "../utils.js";
import {
    addProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../Managers/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await getProducts();
        let productList = [];
        if (limit && limit >= 0) {
            productList = products.slice(0,parseInt(limit));
            res.status(200).json(productList);
        } else {
           res.status(200).json(products);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await getProductById(parseInt(pid));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const productAdded = await addProduct(newProduct);
        res.json(productAdded );
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newProduct = await getProductById(id);
        if (newProduct) await updateProduct(id, newProduct);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const prod = await getProductById(parseInt(pid));
        if (prod){
            const deleteProduct = await deleteProduct(parseInt(pid)); 
            res.status(200).json({ deleteProduct }); 
        }else{
            res.status(500).json({ message: "Product not found" });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

export default router;
