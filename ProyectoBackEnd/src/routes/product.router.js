import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";

const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);



export default router;

/* router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await getProducts();
        let productList = [];
        if (limit && limit >= 0) {
            productList = products.slice(0, parseInt(limit));
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
        const { title, description, price, thumbnails, code, stock, category } =
            req.body;

        const productAdded = await addProduct(
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category
        );
        res.json(productAdded);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newProduct = req.body;
        const product = await updateProduct(id, newProduct);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const prod = await getProductById(parseInt(pid));
        if (prod) {
            const deletedProduct = await deleteProduct(parseInt(pid));
            res.status(200).json({ deletedProduct });
        } else {
            res.status(500).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/
