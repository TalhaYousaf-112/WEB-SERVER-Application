
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1') 
const message_2 = document.querySelector('#message-2') 

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    message_1.textContent = "Loading..."
    message_2.textContent = ""
    
    fetch("http://localhost:3000/weather?adress="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message_1.textContent = data.error
            } 
            else{
                message_1.textContent = data.forecast
                message_2.textContent = data.location
 
                
                } 
    })
})    
})