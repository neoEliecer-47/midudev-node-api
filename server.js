
const cors = require('cors')
const express = require('express')
const app = express()

//Middleware que interceptan las PETICIONES/SOLICITUDES/REQUEST del cliente
app.use(cors())
app.use(express.json())//habilitamos a express para que lea peticiones en json

app.use((request, response, next) => {//cuando no tiene una ruta, cada peticion pasará por aqui
    console.log(request.method)
    console.log(request.body)
    console.log(request.path)
    next()
})

let games = [
    
    {   "id": 1,
       " Content": "God Of War: sobre kratos y su venganza",
        "theLastOfuS": "sobre un mundo apocaliptico y el amor",
    },
    {
        "id": 2,
        "splinterCell": "sobre Sam fisher y su historia como espía",
        "assassingCreed": "sobre la dinastia de asesinos y sus legados en la historia",
    
    },
    {
        "id": 3,
        "naruto": "sobre un ninja que busca ser reconocido",
        "dragonBall": "sobre goku y sus amigos para salvar el universo"
    }
]


//const http = require('http')//Common js
//import http from 'http'//modulos: trabajando con ecmascript6 modules ES modules
//dos maneras de cargar modulos de manera distinta

/*const app=  http.createServer((request, response) => {
response.writeHead(200, {'Content-type': 'aplication/json'})
response.end(JSON.stringify(games))
})*/

app.get('/', (request, response) => {
    response.send(`<h1>Hola desde el home</h1>`)
    //return response.json("hola desde insomnia")
})

app.get('/api/games', (request, response) => {
    response.json(games)
})

app.get("/api/games/:id", (request, response) => {
    const {id} = Number(request.params) 
    const game = games.find(game => game.id === id)
    console.log(game)
    if(game) return response.json(game)
    else response.status(404).json({error: 'game not found'})
    //response.json(game)
})

app.delete("/api/games/:id", (request, response) => {
    const {id} = request.params

     games = games.filter(game => game.id !== id)
    return response.status(200).json({msg: "eliminado registro: "+id}).end()

})

app.post("/api/games", (request, response) => {
    const Game = request.body
    
    const ids = games.map(game => game.id)//itera el array y devuelve uno nuevo con los ids unicamente
    const maxId = Math.max(...ids)//busca el id maxio del array
    
    const newGame = {
        id: maxId + 1,
        content: Game.content,
        important: typeof Game.important ==! 'undefined' ? Game.important : false,//el typeof es el tipo de valor que tiene esa propiedad o variable
        date: new Date().toISOString()
        
    }
    
    games = [...games, newGame] 

    return response.json(newGame)
})


app.use((req, res) => {
    console.log('entro aqui')
    return res.status(404).json({error: "not found"})
})

const PORT = 3001
app.listen(PORT, () => console.log(`server running on port: ${PORT} 🎄`))
