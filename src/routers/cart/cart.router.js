const { Router } = require('express')
const CartManager = require('./cartManager')
const ProductManager = require('../products/productManager')
let productsDb = new ProductManager('./products.json')
let cartsDb = new CartManager('./cart.json')
const router = Router()

//Cart Router
router.get('/api/carts/:cid', async (req, res) => {
    let cid = req.params.cid
    try {
        let cart = await cartsDb.getCartById(cid)
        if(cart.length > 0) {
            res.send({
                status: "Success",
                payload: cart
            })
        }else {
            res.send({
                status: "Error",
                error: "No se encoentro el Cart con el ID solcitado..."
            })
        }
    }catch(err) {
        console.log("Hubo un error al querer obtener el Cart con el ID Solcitado...")
    }
})
router.post('/api/carts', async (req, res) => {
    try {
        let createdCartId = await cartsDb.createCart()
        if(createdCartId) {
            let createdCart = await cartsDb.getCartById(createdCartId)
            if(createdCart.length > 0) {
                res.send({
                    status: "Success",
                    payload: createdCart
                })
            }else {
                res.send({
                    status: "Error",
                    error: "No fue posible obtener información del Cart creado..."
                })
            }
        }else {
            res.send({
                status: "Error",
                error: "No fue posible crear el Cart solicitado..."
            })
        }
    }catch(err) {
        console.log("No fue posible crear el Cart con el método createCart...")
    }
})
router.post('/api/carts/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    let product = {...req.body}
    try {
        if(pid === product.id) {
            let productIdInDb = await productsDb.getProductById(pid)
            console.log(productIdInDb)
            if(productIdInDb) {
                let updatedProductConfirmation = await cartsDb.updateCart(cid, pid, product)
                if(updatedProductConfirmation) {
                    let cart = await cartsDb.getCartById(cid)
                    res.send({
                        status: "Success",
                        payload: cart
                    })
                }else {
                    res.send({
                        status: "Error",
                        error: "No fue posible actualizar el Cart solicitado..."
                    })
                }
            }else {
                res.send({
                    status: "Error",
                    error: "No existe el producto en la base de datos de productos..."
                })
            }
        }else {
            res.send({
                status: "Error",
                error: "El ID de producto por parámetro no coincide con el ID del producto del objeto recibido..."
            })
        }
    }catch(err) {
        console.log("No fue posible actualizar en producto en el Cart solicitado...")
    }
})

module.exports = router