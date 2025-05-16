import express from express;


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

    
export default router;