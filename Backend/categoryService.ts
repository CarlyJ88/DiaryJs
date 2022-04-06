import executeQuery from "./db"

interface Category {
  id: number;
  name: string;
  colourCode: string;
  userId: string;
}

export async function listCategories(): Promise<Category[]> {
  const categories = await executeQuery('SELECT * FROM categories', []);
  return categories.rows.map((row: any) => ({ id: row.id, name: row.name, userId: row.user_id, colourCode: row.colour_code }))
}

export async function listCategoriesByDate(): Promise<Category[]> {
  const categories = await executeQuery('SELECT * FROM categories', []);
  return categories.rows.map((row: any) => ({ id: row.id, name: row.name, colourCode: row.colour_code, userId: row.user_id }))
}

export async function listCategoriesForSpeficDate(dateComingInStart: string, dateComingInEnd: string, incomingUserId: string): Promise<Category[]> {
  const entries = await executeQuery('SELECT distinct c.* FROM entries e INNER JOIN categories c ON e.category_id = c.id WHERE e.date between $1 and $2 AND (c.user_id = $3 OR c.user_id is null)', [dateComingInStart, dateComingInEnd, incomingUserId]);
  return entries.rows.map((row: any) => ({ id: row.id, name: row.name, colourCode: row.colour_code, userId: row.user_id }))
}