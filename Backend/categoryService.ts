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
