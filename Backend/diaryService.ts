import executeQuery from "./db"

interface Entries {
  title: string;
  entry: string;
  date: string;
}

interface EntriesSaved extends Entries {
  id: number;
}

export async function listEntries(): Promise<EntriesSaved[]> {
  const entries = await executeQuery('SELECT * FROM entries', []);
  return entries.rows.map((row: any) => ({ id: row.id, title: row.title, entry: row.entry, date: row.date,  }))
}

export async function addEntry(entries: Entries): Promise<EntriesSaved> {
  const entry = await executeQuery('INSERT INTO entries(title, entry) VALUES($1, $2) RETURNING *', [entries.title, entries.entry]);
  return { id: entry.rows[0].id, title: entry.rows[0].title, entry: entry.rows[0].entry, date: entry.rows[0].date};
}

export async function deleteEntry(id: number): Promise<void> {
  await executeQuery('DELETE FROM entries WHERE id = $1', [id]);
}

export async function editEntry(entries: EntriesSaved): Promise<EntriesSaved> {
  const entry = await executeQuery('UPDATE entries SET title = $1, entry = $2, edited = CURRENT_DATE WHERE id = $3 RETURNING *', [entries.title, entries.entry, entries.id]);
  return { id: entry.rows[0].id, title: entry.rows[0].title, entry: entry.rows[0].entry, date: entry.rows[0].date };
}
