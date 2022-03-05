import executeQuery from "./db"

interface Category {
  id: number;
  name: string;
  colourCode: string;
}

export async function listCategories(): Promise<Category[]> {
  const categories = await executeQuery('SELECT * FROM categories', []);
  return categories.rows.map((row: any) => ({ id: row.id, name: row.name, colourCode: row.colour_code }))
}

export async function listCategoriesByDate(): Promise<Category[]> {
  const categories = await executeQuery('SELECT * FROM categories', []);
  return categories.rows.map((row: any) => ({ id: row.id, name: row.name, colourCode: row.colour_code }))
}

export async function listCategoriesForSpeficDate(dateComingInStart: string, dateComingInEnd: string): Promise<Category[]> {
  const entries = await executeQuery('SELECT distinct c.* FROM entries e INNER JOIN categories c ON e.category_id = c.id WHERE e.date between $1 and $2', [dateComingInStart, dateComingInEnd]);
  return entries.rows.map((row: any) => ({ id: row.id, name: row.name, colourCode: row.colour_code }))
}