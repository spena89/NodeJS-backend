import { Router } from "express";
import { __dirname } from "../utils.js";
import {
    addProduct,
    getMaxId,
    getProductById,
    getProducts,
    deleteProduct,
    updateProduct,
    findProductIndex,
} from "../Managers/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { limit } = req.query.limit;
        const allProducts = await getProducts();
        const productList = [];
        if (limit) {
            productList = allProducts.slice(0,parseInt(limit));
            res.status(200).json(productList);
        } else {
            res.status(200).json(allProducts);
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
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
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
        res.json({ product });
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
            res.json({ deleteProduct }); 
        }else{
            res.status(500).json({ message: "Product not found" });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

export default router;
