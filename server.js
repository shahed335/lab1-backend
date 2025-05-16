import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/products.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json()); //


const  PORT = process.env.PORT || 3002;

app.use("/api/Products",productRoutes);


app.get("/",(req,res)=>{
    res.send("Welcome to your first API server")
});


app.use((req,res)=>{
    res.json({ message: "Route not found" });
});


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});