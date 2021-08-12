const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const dbport = 27017

const url = `mongodb://localhost:${dbport}`

mongoClient.connect(url, (err,db)=>{
    if(err){
        console.log("Error Connect")
    }else{
        const myDb = db.db('AppData')
        const IDTable = myDb.collection(`IDList`)
        const RoomTable = myDb.collection(`RoomData`)
        console.log(`mongo link ${url}`);

        app.get('/signup', (req,res)=>{
            console.log("signupget");
            res.send('root page');
        });

        //가입 함수
        app.post('/signup', (req,res)=>{
            console.log("signup");

            const newUser={
                _id : req.body._id,
                Name: req.body.Name,
                Photo: req.body.Photo,
                RoomName: [],
                ToDoLists:[],
            }
            const query = {_id : newUser._id}

             //아이디 쿼리 날려서 없으면 넣고 있으면 오류
            IDTable.findOne(query, (err,result)=>{
                if (result == null){
                    IDTable.insertOne(newUser, (err, result)=>{
                        res.status(200).send()
                    })
                }else{
                    res.status(400).send() 
                }
            })
        })

    }  
})
app.use(express.json())


app.listen(3000,()=>{
    console.log("listen port 3000")
}) 

app.listen(80,()=>{
    console.log("listen port 80")
}) 