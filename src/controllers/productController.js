const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productDB.json');
const leerJson = ()=> JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports={
    index: (req, res)=>{
        let productos = leerJson()
        res.render('products/index', {productos})
    },
    detail:(req, res)=>{
        const productos = leerJson()
        const producto_buscado = req.params.id
        const producto_encontrado = productos.find(producto => producto.id == producto_buscado)
        
        res.render('products/details',{producto_encontrado})
    },
    create:(req, res)=>{
        res.render('products/create')
    },
    store:(req, res)=>{
    const productos = leerJson()

    let nuevo_producto = {
        id:productos[productos.length-1].id+1,
        ...req.body,
        image:req.file.filename
    }
  
    let nuevaDB = JSON.stringify([...productos,nuevo_producto],null, 2)

    fs.writeFileSync(productsFilePath,nuevaDB)

    res.redirect('/products')

    },
    update:(req,res)=>{
        console.log(req.body);
    }
}