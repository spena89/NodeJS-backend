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
        await newCart();
        res.status(200).json({
            msg: `cart created successfully`,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post("/:idCart/product/:idProduct", async (req, res) => {
    try {
        const { idCart, idProduct } = req.params;
        const cart = await saveProductToCart(
            parseInt(idCart),
            parseInt(idProduct)
        );
        res.status(200).json({
            msg: `cart ${cart.id} updated successfully`,
        });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await getCartById(parseInt(cid));
        if (!cart) {
            res.status(404).json({ message: "cart not found" });
        } else {
            res.status(200).json(cart.products);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
