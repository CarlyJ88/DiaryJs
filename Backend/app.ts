import express from "express";
import {listEntries, addEntry, deleteEntry, editEntry, listEntriesForSpeficDate} from "./diaryService";
import {listCategories, listCategoriesForSpeficDate} from "./categoryService";
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
  const passBack = await addEntry(entry)
  res.json(passBack)
})

app.delete('/delete-entry', async(req, res) => {
  const id = req.body.id
  const comingBack = await deleteEntry(id)
  res.json(comingBack)
})

app.put('/edit-entry', async(req, res) => {
  const entry = req.body
  const passBack = await editEntry(entry)
  res.json(passBack)
})

app.get('/list-categories', async(req, res) => {
  res.json(await listCategories())
})

app.get('/list-entries-by-date', async(req, res) => {
  const dateComingInStart = req.query.dateComingInStart as string
  const dateComingInEnd = req.query.dateComingInEnd as string
  const passBack = await listEntriesForSpeficDate(dateComingInStart, dateComingInEnd)
  res.json(passBack)
})

app.get('/list-categories-by-date', async(req, res) => {
  const dateComingInStart = req.query.dateComingInStart as string
  const dateComingInEnd = req.query.dateComingInEnd as string
  const passBack = await listCategoriesForSpeficDate(dateComingInStart, dateComingInEnd)
  res.json(passBack)
})

export default app;
