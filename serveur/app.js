const express = require("express");
const {connect} = require("mongoose");
dotenv = require("dotenv").config();
const route = require("./routes")

const URI = process.env.NODE_ENV === "production" ? process.env.BDD_PROD : process.env.BDD_DEV

connect(URI)
    .then(() => console.log("connexion à MongoDB réussie"))
    .catch((ex) => console.log(ex))
const port = 5000

// connexion à  la MB


const app = express()

app.use(express.json());


// app.get("/all", (req, res) => {
//     return res.json({msg : "voici l'oeuvre demandée"})
// })
app.use("/" , route )  // 



app.listen(port, () => console.log("le serveur à démarré au port " + port))

