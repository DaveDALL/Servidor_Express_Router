const express = require('express')
const productsRouter = require('./src/routers/products/products.router')
const cartRouter = require('./src/routers/cart/cart.router')
const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(productsRouter)
app.use(cartRouter)

app.listen(PORT, () =>{
    console.log('Server running on port :', PORT)
})