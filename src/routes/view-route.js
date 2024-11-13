import { Router } from "express";

const routerViews = Router()

routerViews.get('/', (req, res) =>{
    res.render('home')
})

routerViews.get('/productosTiempoReal', (req,res) =>{
    res.render('productosTiempoReal')
})

export default routerViews