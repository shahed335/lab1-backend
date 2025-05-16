import express from 'express';


const router = express.Router();

let products = [

    { id:1 , name:"Laptop", price: 1200 },
    { id: 2, name: "Phone", price: 800 }
];

// get all the products:
router.get("/", (req, res) => {
    res.json(products);
});

// Get a single product by ID

router.get("/:id", (req, res) => 
    {
        const product = products.find((product) => {
            if (product.id == req.params.id){
                return product;
            }
            
        })
        if (product){
            res.json(product);
        }
        else{
            res.status(404).send({ message: "product not found" });

        }

    });

// Add a new product

    router.post("/", (req,res) => {
        const newProduct = {
            id: Date.now(),
            name: req.params.name,
            price: req.params.price
        }
        products.push(newProduct);
        res.json(newProduct);
    });

    // update
    router.put("/:id", (req, res) => {
        const id = req.params.id;
        const { name, price } = req.body;

        let found = false;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {

                if (name !== undefined) {

                    products[i].name = name;
                }
                if (price !== undefined) {
                    products[i].price = price;
                }
                found = true;

                res.json(products[i]);
                break;
            }
        }

        if (!found) {
            res.status(404).json({ message: "Product not found" });
        }
    });


    // delete 
    router.delete("/:id", (req, res) => {
        const { id } = req.params;
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            const deletedProduct = products.splice(index, 1);
            res.json(deletedProduct[0]);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
});

    
export default router;