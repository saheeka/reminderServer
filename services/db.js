const mongoose=require("mongoose")


mongoose.connect('mongodb://localhost:27017/reminderApp',{
    useNewUrlParser:true
})


const User=mongoose.model('User',{
    name:String,
    password:String,
    reminders:[]
})
module.exports={
    User
}