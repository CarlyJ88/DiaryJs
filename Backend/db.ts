import { Client } from 'pg';

export default async function executeQuery(sql: string, values: any[]){
  const client = new Client({
    user: 'carlyjenkinson',
    database: 'diary_test'
  })
  await client.connect()

  const result = await client.query(sql, values)
  await client.end()
  return result;
}