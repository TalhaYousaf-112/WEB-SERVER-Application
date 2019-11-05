const path = require('path')
const express = require('express')
const nodeFlag = require('node-flag')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(nodeFlag.getAll())

//console.log(__dirname)

const app = express()

//Define paths for express configurations

const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'templates/partials')

//Setup handlebars engine and views location
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs');
app.set('views',viewPath)


//Setup static directories to serve

app.use(express.static(publicPath))
app.get('/', (req,res)=>{
    res.render('index',{
        title: "Weather",
        name: "Andrew"

    });
})
app.get('/weather',(req,res)=>{
    if(req.query.adress){
        console.log(req.query.adress)
        geocode(req.query.adress,(error,{latitude,lognitude,location}={})=>{
            if(error ){
                return res.send({error})
 
            }
         
        forecast(latitude, lognitude, (error, forecastData) => {
                
            if(error){
                return res.send(error)
          }
      
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
              })
      
            })
      
      }
      else{
            res.send({error : "Enter location"})
      }
})
app.get('/about',(req,res)=>{
        
        res.render('about',{
        title:' Talha',
        name: 'Andrew'

    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : "Help",
        message : "click here to get help",
        name: 'Andrew'        

    })
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        errorMessage:"Help article not founded",
        name: "Andrew"
    })

})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : "youmust provide the search"
        })
        
    }
    res.send({
        product: []

    })
    

        

 } )


app.get('*',(req,res)=>{
    res.render('404page',{
        errorMessage:"error 404 page not founded",
        name:"Andrew"
    })
})

app.listen(3000,()=>{
    console.log("Server is running on 3000 Port")
})