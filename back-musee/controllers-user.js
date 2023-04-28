const {User} = require("./models")
const {genSalt, hash} = require ("bcrypt")
const { schemaJoiUser } = require("./verif")

module.exports.createNewUser = async (req, res)=>{
    try {
        // recuperé le body de req
        const {body } = req
        // vérifier que body contient email password et role 
        // Vérifier si y a pas deja un email existant 
        let result = await User.findOne({email: body.email})
        // Si ce n'est pas bon stop
        if(result) return res.status(400).json({msg : "l'email choisi est deja pris"})
        // Prendre le password de user et d'avoir Hashé via bcrypt
        const salt = await genSalt(10)
        const passwordHashe = await hash(body.password, salt)
        // Alors tu peux faire la creation 
        let user = new User ({email: req.body.email, password : passwordHashe, role: req.body.role});
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
module.exports.getUser = async (req, res)=>{
    const id = req.params.id
    const users = await User.findById(id)
    return res.json(users) ;

}

module.exports.editUser = async (req, res)=>{
    const modifUser = await User.findById(req.params.id); 
    if(!modifUser){
        return res.status(400).json({msg : "ce user n'existe pas"})
    }
    const updateUser = await User.findByIdAndUpdate(modifUser, req.body, {new : true})
    return res.status(200).json(updateUser);
}

module.exports.deleteUser = async (req, res)=>{
    const id = req.params.id;
    const supUser = await User.findByIdAndRemove(id)
    if(!supUser) return res.status(404).json({msg : `User ${id} n'existe pas`})
    
    return res.status(200).json({msg : `User ${id} est bien supprimé`});
};

module.exports.getAllUser = async (req, res)=>{
    const all = await User.find({}).select({_id : 1 , email : 1 , role : 1})
    return res.json(all) ;
};
