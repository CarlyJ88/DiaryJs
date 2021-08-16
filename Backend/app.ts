import express from "express";
import {listEntries, addEntry} from "./diaryService";
import cors from "cors"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/', async(req, res) =>{
  res.json(await listEntries())
})

app.post('/add-entry', async(req, res) => {
  const entry = req.body
  console.log(req.body, 'req.body')
  const passBack = await addEntry(entry)
  res.json(passBack)
})

export default app

