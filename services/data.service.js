const db = require('./db')
const { v4: uuidv4 } = require('uuid')

// let user={
//     "ammu": {name:"ammu",password:"ammu",reminders:[{Event:"call doc",note:"thursday"}]},
//      "abhi":{name:"abhi",password:"abhi",reminders:[]}
 
//    }
   const register=(name,password)=>{
    return  db.User.findOne({name}).then(user=>{
       
    if(user )
    {
      return{
        statusCode:422,
          satus:false,
          message:"User already exist!! pls login.."
      }
    }
    else{
      const newUser= new db.User({
        name,
        password,
        reminders:[]
      })
      newUser.save()
      return {
        statusCode:200,
          status:true,
          message:"Successfully registered.....!!!!!!"
      }
    }
  })
      }

    const login=(name,password)=>{
      return db.User.findOne({name,password}).then(user=>{
        
        if(user){
          return {
            statusCode:200,
            status:true,
            message:"Successfully logged in.....!!!!",
            currentUser:user.name
    }
  }
  else{
    return{
      statusCode:422,
            status:false,
            message:"invalid credentials....."
    }
  
        }
      })
        
   }  
  const  addReminder=(name,eventt,note,date)=>{
    let uno = uuidv4();

    return db.User.findOne({ name }).then(user => {
     // console.log(user)
      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "invalid password"
        }
      }
  else{
     
      user.reminders.push({
        Id:uno,
        Event: eventt,
        Note:note,
        Date:date
      })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: "successfully added reminder"
      }
    }  
    })
  }


  const  edit=(id,neweventt,newnote,newdate)=>{
    
    let data={
      Id:id,
Event:neweventt,
Note:newnote,
Date:newdate
    }
    return db.User.updateOne(
      {name:curuser, "reminders.Id": id },
      {$set:{"reminders.$":data}}).then(user => {
      // console.log(user)
     // console.log(reminder[i]);
      if (!user) {
        return {
          statusCode: 422,
          status: false,
          message: "invalid ...."
        }
      }else{
      return {
        statusCode: 200,
        status: true,
        reminders:user.reminders,
        message: "successfully updated..."
      }
    }  
    })
  }
var curuser;
 const  remove=(Id)=>{
   console.log(curuser,Id);
    return db.User.updateOne({name:curuser},{ $pull: {reminders:{Id}}})
    .then(user=>{
        //console.log(user);
    
        if(!user){
          return{
          statusCode: 422,
          status: false,
          message: "invalid ...."
        }
      }
      else{
        return {
          statusCode: 200,
          status: true,
          reminders:user.reminders,
          message: "removed..."
        }
      }  
      })
  
    }
 

var reminder;
 const viewReminder=(name)=>{
   return db.User.findOne({name}).then(user=>{
      curuser=user.name
     // reminder=user.reminders
    //  console.log(reminder);
    if(user){
      return{
      
          statusCode: 200,
          status: true,
          reminders:user.reminders 
      }
    }
    else{
      return{
        statusCode: 422,
            status: false,
            message: "invalid"
      }
    }
   })
 }  
      module.exports={
          register,
          login,
          addReminder,
          remove,
          viewReminder,
          edit
        
      }