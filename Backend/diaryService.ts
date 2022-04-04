import executeQuery from "./db"

interface Entries {
  title: string;
  entry: string;
  categoryId: number;
  link: string;
  incomingUserId: string;
}

interface EntriesSaved extends Entries {
  id: number;
  date: string;
  edited: string;
  incomingUserId: string;
}

export async function listEntries(): Promise<EntriesSaved[]> {
  const entries = await executeQuery('SELECT e.*, c.name, c.colour_code FROM entries e INNER JOIN categories c ON e.category_id = c.id', []);
  return entries.rows.map((row: any) => ({ id: row.id, title: row.title, entry: row.entry, incomingUserId: row.user_id, categoryId: row.category_id, date: row.date, edited: row.edited, link: row.link, categoryName: row.name, colourCode: row.colour_code }))
}

export async function addEntry(entries: Entries): Promise<EntriesSaved> {
  console.log('am i here?', entries)
  const entry = await executeQuery('INSERT INTO entries(title, entry, category_id, link, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *', [entries.title, entries.entry, entries.categoryId, entries.link, entries.incomingUserId]);
  console.log(entry, 'entry in diary service')
  return { id: entry.rows[0].id, title: entry.rows[0].title, entry: entry.rows[0].entry, categoryId: entry.rows[0].category_id, link: entry.rows[0].link, incomingUserId: entry.rows[0].user_id, date: entry.rows[0].date, edited: entry.rows[0].edited };
}

export async function deleteEntry(id: number): Promise<void> {
  await executeQuery('DELETE FROM entries WHERE id = $1', [id]);
}

export async function editEntry(entries: EntriesSaved): Promise<EntriesSaved> {
  const entry = await executeQuery('UPDATE entries SET title = $1, entry = $2, category_id = $3, link = $4, edited = CURRENT_DATE WHERE id = $5 and user_id = $6 RETURNING *', [entries.title, entries.entry, entries.categoryId, entries.link, entries.id, entries.incomingUserId]);
  return { id: entry.rows[0].id, title: entry.rows[0].title, entry: entry.rows[0].entry, incomingUserId: entry.rows[0].user_id, categoryId: entry.rows[0].category_id, link: entry.rows[0].link, date: entry.rows[0].date, edited: entry.rows[0].edited };
}

export async function listEntriesForSpeficDate(dateComingInStart: string, dateComingInEnd: string, incomingUserId: string): Promise<EntriesSaved[]> {
  const entries = await executeQuery('SELECT e.*, c.name, c.colour_code FROM entries e INNER JOIN categories c ON e.category_id = c.id WHERE e.date between $1 and $2 AND e.user_id = $3', [dateComingInStart, dateComingInEnd, incomingUserId]);
  return entries.rows.map((row: any) => ({ id: row.id, title: row.title, entry: row.entry, incomingUserId: row.user_id, categoryId: row.category_id, date: row.date, edited: row.edited, link: row.link, categoryName: row.name, colourCode: row.colour_code }))
}
