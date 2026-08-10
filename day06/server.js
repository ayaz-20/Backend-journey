// const dns = require('node:dns');

// // Force Node.js to resolve DNS using Google and Cloudflare DNS
// dns.setDefaultResultOrder('ipv4first');
// dns.setServers(['8.8.8.8', '1.1.1.1']);
//above code is used to force Node.js to resolve DNS using Google and Cloudflare DNS servers. It sets the default result order to prioritize IPv4 addresses first and specifies the DNS servers to use for resolution. This can be useful in scenarios where you want to ensure that your application uses specific DNS servers for name resolution, potentially improving performance or reliability.

const app = require("./src/app");
const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://alayazdb@ac-mfxnh5u-shard-00-00.bmtgc94.mongodb.net:27017,ac-mfxnh5u-shard-00-01.bmtgc94.mongodb.net:27017,ac-mfxnh5u-shard-00-02.bmtgc94.mongodb.net:27017/?ssl=true&replicaSet=atlas-8l05pk-shard-0&authSource=admin&appName=Cohort/day-06").then(() => {
    console.log("Database connected successfully");
  })
  
}

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
 
 

