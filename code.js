const axios = require("axios")

const url="http://localhost:8080/test/2"

;(async function(){
    axios.get(url)
    .then(res=>console.log(res.data))
})()