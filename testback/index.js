const express = require('express')


const app = express()

const PORT = 3000

app.get('/', (req, res) => res.send('Home page'))
app.get('/login', (req, res) => res.send('Login page'))
app.get('/signup', (req, res) => res.send('Signup page'))

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))