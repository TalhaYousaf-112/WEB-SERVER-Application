const request = require('request')


const forecast = (lat,log,callback) =>{

const url = 'https://api.darksky.net/forecast/cd8ab3f93097642269e587005b7a969c/'+lat+','+log
//const url = 'https://api.darksky.net/forecast/cd8ab3f93097642269e587005b7a969c/33.657270,73.156363?lang=ur&units=si'

request({url,json:true},(error,{body})=>{
    if(error)
    {
        callback("Unable connect to the web server",undefined)

    }else if(body.error){
        
        callback("Unable to find this location. Make sure coordinates are correct",undefined)
    }
 
    else
    {
        callback(undefined,"It is currently "+body.currently.apparentTemperature+" Degree out there "+ body.currently.precipProbability +" chances of rain"
        )
 

    }

})
}

module.exports = forecast

