let express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, ()=>console.log("Runing..."))

app.use(express.json());
app.use(express.urlencoded());
app.get('/',(req,res) => res.send('Node js'))


let users = [
    {id:1,name:"mengheang",password:"223"},
    {id:2,name:"heang",password:"223"},
    {id:3,name:"meng",password:"223"}
]
app.get('/api/users',(req,res)=> res.send(users));

app.get('/api/users/:id',(req,res)=>{
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    if(index>=0){
        let user = (users[index]);
        res.send(user);
    }
    else{
        res.status(404);
        res.send({error : "user id not found"});
    }
})

app.post('/api/users',(req,res)=>{
    if(!req.body.password){
        res.status(404)
        return res.send({error :"password Required"});
    }
    let user= {
        id : users.length+1,
        name:req.body.name,
        password : req.body.password,
    }
    users.push(user);
    res.send(users)
})
app.put('/api/users/:id',(req,res)=>{
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    let pass = req.body.password;
    let userN = req.body.name
    if(index>=0){
        let user = (users[index]);
 //       what you wanna update!!
        user.name = userN;
        user.password = pass;
        res.send(user)
        
    }
    else{
        res.status(404);
        res.send({error : "user id not found"});
    }
})

app.delete('/api/users/:id',(req,res)=>{
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    if(index>=0){
        users.splice(index,1)
        res.send({message:'sucessfully deleted'})
    }
    else{
        res.status(404);
        res.send({error : "user id not found"});
    }
})