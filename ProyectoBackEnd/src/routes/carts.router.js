import { Router } from "express";
import { __dirname } from "../utils.js";
import {
    newCart,
    getCartById,
    saveProductToCart,
} from "../Managers/cartManager.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const newCarrito = await newCart();
        res.status(200).json({
            msg: `Cart ${newCarrito.id} created successfully: ${newCarrito.products}`,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post("/:idCart/product/:idProduct", async (req, res) => {
    try {
        const { idCart, idProd } = req.params;
        const newCart = await saveProductToCart(
            parseInt(idCart),
            parseInt(idProd)
        );
        if (cart === "Cart not found") {
            res.status(500).json({ message: "Cart not found" });
        } else if (cart === "Product not found") {
            res.status(500).json({ message: "Product not found" });
        } else {
            res.status(200).json({
                msg: `Cart ${newCart.id} updated successfully: ${newCart.products}`,
            });
        }
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await getCartById(parseInt(cid));
        if (cart === "Not found") {
            res.status(404).json({ message: "cart not found" });
        } else {
            res.status(200).json(cart.products);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
