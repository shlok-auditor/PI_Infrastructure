const express = require('express')
const app = express()

app.get('/flip-coins',(req,res)=>{
    const time = req.query.times
    if(time >0){
        let heads = 0 
        let tails = 0
        for(let i=0;i<time;i++){
            let randomNumber = Math.random()
            if(randomNumber<0.5){
                heads++
            }else{
                tails++
            }
        }
        res.json({heads,tails})
    }else{
        res.send('Enter valid number')
    }
})

app.listen(5000,()=>{
    console.log('Started and listening ...');
})