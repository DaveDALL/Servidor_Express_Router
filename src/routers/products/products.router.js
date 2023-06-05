const { Router } = require('express')
const ProductManager = require('./productManager.js')
let productsDb = new ProductManager('./products.json')
const router = Router()

//Products Router
router.get('/api/products', async (req, res) => {
    let limit = req.query.limit
    let ps = await productsDb.getProducts()
    if(!limit || limit > ps.length) {
        try{
            let products = [...ps]
            res.send({
                status: "Success",
                payload: products})
        }catch(err) {
            console.log('No es posible Leer el archvio de productos...')
        }
    }else {
        try {    
            if(limit > 0) {
                let products = ps.filter((p, i) => i < limit)
                res.send({
                    status: "Success",
                    payload: products})
            }else {
                res.send({
                    status: "Error",
                    error: "El limite es menor o igual a cero..."})
            }
        }catch(err) {
            console.log('No es posible Leer el archvio de productos...')
        }
    }
})

router.get('/api/products/:pid', async (req, res) => {
    let pid = String(req.params.pid)
    try {
        let product = await productsDb.getProductById(pid)
        if(product.length > 0) {
            res.send({
                status: "Success",
                payload: product})
        }else {
            res.send({
                status: "Error",
                error: "No existe el producto con el ID solicitado..."})
        }
    }catch(err) {
        console.log('No es posible Leer el archivo de productos...')
    }
})

router.post('/api/products', async (req, res) => {
    let productToAdd = {...req.body}
    try {
        let idProductAdded = await productsDb.addProduct(productToAdd)
        console.log("Producto agregado con éxito con ID: ", idProductAdded)
        if(idProductAdded) {
            let product = await productsDb.getProductById(idProductAdded)
            res.send({
                status: "Success",
                message: "El producto se agrego exitosamente",
                payload: product})
        } else {
            res.send({
                status: "Error",
                error: "El producto no puede ser agregado..."
            })
        }
    }catch (err) {
        console.log('Existe un error al tratar de agregar el producto...')
    }
})

router.put('/api/products/:pid', async (req, res) => {
    let pid = req.params.pid
    let productToUpdate = {...req.body}
    try {
        if (productToUpdate.id === pid) {
            let productToModify = await productsDb.getProductById(pid)
            console.log(productToModify)
            if(productToUpdate.code === productToModify.code) {
                let updatedProductConfirmation = await productsDb.updateProduct(productToUpdate)
                if (updatedProductConfirmation) {
                    let ModifiedProduct = await productsDb.getProductById(pid)
                    res.send({
                        status: "Success",
                        message: "Producto actualizado exitosamente",
                        payload: [{InfoAnterior: productToModify}, {InfoNueva: ModifiedProduct}]
                })
            }else {
                res.send({
                    status: "Error",
                    error: "No existe el producto con el ID solicitado..."
                })
            }
            }else {
                res.send({
                    status: "Error",
                    error: "El código del producto no se debe modificar..."
                }) 
            } 
        }else {
            res.send({
                status: "Error",
                error: "El ID del producto no se debe modificar..."
            })
        }
    }catch (err){
        console.log('Existe un error al tratar de actualizar el producto...')
    }
})

router.delete('/api/products/:pid', async (req, res) => {
    let productToDeleteId = req.params.pid
    try {
        let deletedProductConfirmation = await productsDb.deleteProductById(productToDeleteId)
        if (deletedProductConfirmation) {
            let products = await productsDb.getProducts()
            res.send({
                status: "Success",
                message: "Producto borrado exitosamente",
                payload: products})
        }else {
            res.send({
                status: "Error",
                error: "No se encontro el producto con el ID solicitado..."
            })
        }
    }catch (err){
        console.log('Error al intentar borrar el productos solicitado...')
    }
})

module.exports = router