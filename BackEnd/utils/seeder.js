const Product = require("../models/ProductModel");
const dotenv = require("dotenv");
const DatabaseConnect = require("../config/Database");
const products = require("../data/AgroHub.products.json");
dotenv.config({ path: "BackEnd/config/.env" });

DatabaseConnect();
const url = process.env.DB_ATLUS_URL;
console.log(url)

const seedProducts = async () => {
    try{
           await Product.deleteMany();
           console.log('Products are deleted!!');

           await Product.insertMany(products);
           console.log('All Products are added!!');
        process.exit();	

    } catch (error){
         console.log(error.message);
         process.exit();
    }
}
seedProducts();
