const express=require('express')
const cors=require('cors')
const dataService=require('./services/data.service')
const app=express()


app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
app.use(express.json())
app.get('/',(req,res)=>{
res.send("get method..")
})
app.listen(3000,()=>{
    console.log("server started at port number 3000");
})

app.post('/register',(req,res)=>{
dataService.register(req.body.name,req.body.password).then(result=>{
    res.status(result.statusCode).json(result)
})
    console.log(req.body)
   
})

app.post('/login',(req,res)=>{
    dataService.login(req.body.name,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
      //  console.log(req.body)
       
    })
app.post('/addReminder',(req,res)=>{
    dataService.addReminder(req.body.name,req.body.event,req.body.note,req.body.date).then(result=>{
        res.status(result.statusCode).json(result)
    })
       // console.log(req.body)
       
    })
    app.post('/remove',(req,res)=>{
        dataService.remove(req.body.id).then(result=>{
            res.status(result.statusCode).json(result)
        })
          // console.log(req.body)
           
        })

app.post('/edit',(req,res)=>{
      dataService.edit(req.body.id,req.body.event,req.body.note,req.body.date).then(result=>{
     res.status(result.statusCode).json(result)
     })
              // console.log(req.body)
               
     })
app.post('/viewReminder',(req,res)=>{
     dataService.viewReminder(req.body.name).then(result=>{
      res.status(result.statusCode).json(result)
     })
     // console.log(req.body)
               
     })       