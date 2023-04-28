const {Schema, model , Types} = require("mongoose")

const oeuvreSchema = new Schema(
      {
      nom : String,
      description : String,
      image : String,
      auteur : String,
      dt_publication : {type : Date , default : Date.now },
    },
      {
        timestamps : true,
      },
);
const Oeuvre = model("oeuvres" , oeuvreSchema);



const userSchema = new Schema(
     {
     email : String,
     password: String,
     role : { type : String , enum : ['redacteur' , 'admin'] }
},
    {
        timestamps : true,
      },
)
const User = model("users" , userSchema);



module.exports.Oeuvre = Oeuvre;
module.exports.User = User ;