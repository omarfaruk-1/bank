import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

connectDB();


app.listen(5000,()=>{
    console.log(`Server running port 5000`);
})