const {Router} = require("express")
const {schemaLogin } = require("./verif")
const { User } = require("./models")
const { compare } = require ("bcrypt")
const JWT = require("jsonwebtoken")



const route = Router();


route.post("/login" , async (req , res) => {
    // recuperation de la body http
    const { body } = req
    // verification dans la req http le body qu'il y aun email valide et un password  
    const {error} = schemaLogin.validate(body , {abortEarly : false})
    // si erreur on stoppe avec une erreur htttp 400 
    if(error) return res.status(400).json(error.details);
    // si ok le test 1, 
    // Alors on recherhe un utilisateur saisi 
    const userRecherche = await User.findOne({email : body.email})
    // Si on le trouve pas dans la base alors on stoppe avec une erreur 404 
    if(!userRecherche) return  res.status(404).json({msg : "aucun user trouvé avec ces identifiants" });
    // si le test 2 ok , alors onn va comparé le mdp en BD qui est (hashé) avec bcrypt et le mdp dans le body de la req 
    const verif = await compare(body.password , userRecherche.password )
    // si le mdp hashé n'est pas comprable au mdp saisi alors on stoppe avec erreur 404 
    if(!verif) return res.status(404).json({msg : "aucun user trouvé avec ces identifiants" })
    // en terme de sécurité on enlève le mdp 
    const userSansMdp = {
        _id : userRecherche._id ,
        email : userRecherche.email , 
        role : userRecherche.role ? userRecherche.role : "redacteur"
    }
    // on va transforme userSansMdp en JWT , cela permet au client de s'autoriser 
    const token = JWT.sign(userSansMdp , process.env.CLE_PRIVEE_JWT);
    // on envoie l'info au client "bienvenu et JWT "
    res.json( {msg : "bienvenu " , token : token} ) 
})

module.exports = route 
