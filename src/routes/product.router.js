import { Router } from "express";
import ProductManager from "../services/productManager.js";

const router = Router();
let productos = new ProductManager("./src/data/products.json");

router
    .get('/', async (req, res) => {
        try {
            let products = await productos.getProducts();
            let { limit } = req.query;
            if (limit) {
                products.length = limit;
                res.send({products});
            } else {
                res.send({products});
            }
        } catch (error) {
            res.status(400).json({success: false, error: 'Error al buscar los productos'});
        }
    })

    .get ('/:pid', async (req, res) => {
        try {
            const products = await productos.getProductById(parseInt(req.params.pid));
            res.send({products});
        } catch (error) {
            res.status(404).json({success: false, error: `El producto con el id: ${req.params.pid} no existe!`});
        }
    })

    .post ('/', async (req, res) => {
        try {
            let product = req.body;
            await productos.addProducts(product);
            res.send({status: 'Success', message : 'Poducto agregado con exito!'})
        } catch (error) {
            res.status(400).send({ status: "Error", message: "Error, verifique los datos nuevamente." });
        }
    })

    .put ('/:pid', async (req, res) => {
        try {
            const {body, params: { pid } } = req;
            console.log(body);
            await productos.updateProducts(pid, body);
            res.send({ status: "Success", message: `se ha actualizado el producto correctamente` });
        } catch (error) {
            res.status(400).send({ status: "Error", message: "No se actualizó, compruebe sus datos otra vez." });
        }      
    })

    .delete ('/:pid', async (req, res) => {
        try {
            const pid = parseInt(req.params.pid)
            await productos.deleteProduct(pid);
            res.send({ status: "Success", message: `Ud ha eliminado el producto exitosamente!` });
        } catch (error) {
            res.status(400).send({ status: "Error", message: "No pudo eliminarse el producto, intentelo nuevamente" });
        }
    })

export default router