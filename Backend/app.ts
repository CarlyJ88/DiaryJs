import express from "express";
import {listEntries, addEntry, deleteEntry, editEntry} from "./diaryService";
import {listCategories} from "./categoryService";
import cors from "cors";
import path from"path";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(express.static(path.join(__dirname, "public")));

app.get('/list', async(req, res) =>{
  res.json(await listEntries())
})

app.post('/add-entry', async(req, res) => {
  const entry = req.body
  console.log(req.body, 'req.body')
  const passBack = await addEntry(entry)
  res.json(passBack)
})

app.delete('/delete-entry', async(req, res) => {
  const id = req.body.id
  const comingBack = await deleteEntry(id)
  res.json(comingBack)
})

app.put('/edit-entry', async(req, res) => {
  console.log('did I happen?', req)
  const entry = req.body
  console.log(entry);
  const passBack = await editEntry(entry)
  res.json(passBack)
})

app.get('/list-categories', async(req, res) => {
  res.json(await listCategories())
})

export default app;
