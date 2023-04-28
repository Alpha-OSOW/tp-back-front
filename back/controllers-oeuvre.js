const { Oeuvre } = require("./models");


module.exports.getPosts = async (req, res) =>{
    const post = await Oeuvre.find();
    res.status(200).json(post)
}


module.exports.setPosts = async (req, res ) => {
        if(!req.body.description){
           return res.status(400).json({msg : "Merci d'ajouter un message"})
        }
        const post = new Oeuvre (req.body)
    //    const post = await PostModel.Oeuvre.create({
    //     message: req.body.message,
    //     auteur: req.body.auteur
    //    })
        await post.save()
       res.status(200).json(post);
       
};
module.exports.editPosts = async (req , res) =>{
    const post = await Oeuvre.findById(req.params.id);
    if(!post){
        return res.status(400).json({msg : "ce post n'existe pas"})
    }
    const updatePost = await Oeuvre.findByIdAndUpdate(post, req.body, {new : true})
    res.status(200).json(updatePost);
}

module.exports.deletePosts = async (req, res) =>{
//     const post = await Oeuvre.findById(req.params.id);
    
    const post = await Oeuvre.findByIdAndRemove(req.params.id);
    if(!post){
        return res.status(400).json({msg : "ce post n'existe pas"})
       }
   res.status(200).json("Message supprimé " + post);

}
