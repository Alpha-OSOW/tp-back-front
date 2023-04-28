const express = require ('express'); 
const router = express.Router();
const routeLogin = require("./connexion")

const {setPosts, getPosts, editPosts, deletePosts} = require("./controllers-oeuvre");
const { createNewUser, getUser, editUser, deleteUser, getAllUser } = require("./controllers-user");


router.get("/post", getPosts );
router.post("/post", setPosts );
router.put("/post/:id", editPosts);
router.delete("/post/:id", deletePosts)

router.post("/user", createNewUser);       
router.get("/user/:id", getUser);          
router.put("/user/:id", editUser);        
router.delete("/user/:id", deleteUser);     
router.get("/userall", getAllUser);

router.use(routeLogin);


module.exports = router;


