const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const apiUrl = 'https://lereacteur-marvel-api.herokuapp.com'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to my API' })
})

app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/characters?skip=${req.query.skip}&name=${req.query.name}&apiKey=${process.env.API_KEY}`,
    )
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.get('/comics', async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/comics?skip=${req.query.skip}&title=${req.query.title}&data=${req.query.data}&apiKey=${process.env.API_KEY}`,
    )
    //console.log(response.data)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.get('/comics/:characterId', async (req, res) => {
  const characterId = req.params.characterId
  console.log(req.params.characterId)

  try {
    const response = await axios.get(
      `${apiUrl}/comics/${characterId}?apiKey=${process.env.API_KEY}`,
    )
    //console.log(response.data)

    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Page not found !' })
})

app.listen(4000, () => {
  console.log('Server started !')
})
