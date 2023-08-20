import express from 'express';
// const express = require('express);
import products from './data.js';
import  dotenv from 'dotenv'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

import e from 'express';

dotenv.config();

connectDB() //connecting the db


const app = express();

// parser the body of express
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// cookie parser middle

app.use(cookieParser());



app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);



console.log(process.env.PAYPAL_CLIENT_ID )

app.get('/api/config/paypal', (req, res) =>

  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);


//  where to put error middleware
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000;



app.listen(port,() => {

    console.log(`listening on port ${port}`)
})






