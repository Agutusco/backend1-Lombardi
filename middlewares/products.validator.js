//archivo middlewares/products.validator.js


export const validator = (req, res, next) =>{

    const  {title, price, thumbnail} = req.body

    //Validar titulo
    if (!title || typeof title !== 'string') {
        return res.status(404).json({message: "El titulo del producto debe ser un string y es obligatorio"})
    }

    //Validar precio
    if (!price || typeof price !== 'number') {
        return res.status(404).json({message: "El precio de un producto debe ser un number y es obligatorio"})
    }

    if (!thumbnail && thumbnail !== 'string') {
        return res.status(404).json({message: "La imagen es obligatoria y debe ser un string"})
    }


    next()

}