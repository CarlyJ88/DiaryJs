import executeQuery from "./db"

interface Entries {
  title: string;
  entry: string;
  categoryId: number;
}

interface EntriesSaved extends Entries {
  id: number;
  date: string;
  edited: string;
}

export async function listEntries(): Promise<EntriesSaved[]> {
  const entries = await executeQuery('SELECT * FROM entries INNER JOIN categories c ON category_id = c.id', []);
  return entries.rows.map((row: any) => ({ id: row.id, title: row.title, entry: row.entry, categoryId: row.category_id, date: row.date, edited: row.edited, categoryName: row.name, colourCode: row.colour_code }))
}

export async function addEntry(entries: Entries): Promise<EntriesSaved> {
  const entry = await executeQuery('INSERT INTO entries(title, entry, category_id) VALUES($1, $2, $3) RETURNING *', [entries.title, entries.entry, entries.categoryId]);
  return { id: entry.rows[0].id, title: entry.rows[0].title, entry: entry.rows[0].entry, categoryId: entry.rows[0].category_id, date: entry.rows[0].date, edited: entry.rows[0].edited };
}

export async function deleteEntry(id: number): Promise<void> {
  await executeQuery('DELETE FROM entries WHERE id = $1', [id]);
}

export async function editEntry(entries: EntriesSaved): Promise<EntriesSaved> {
  const entry = await executeQuery('UPDATE entries SET title = $1, entry = $2, category = $3, edited = CURRENT_DATE WHERE id = $3 RETURNING *', [entries.title, entries.entry, entries.categoryId, entries.id]);
  return { id: entry.rows[0].id, title: entry.rows[0].title, entry: entry.rows[0].entry, categoryId: entry.rows[0].category_id, date: entry.rows[0].date, edited: entry.rows[0].edited };
}
