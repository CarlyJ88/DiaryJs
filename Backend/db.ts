import { Client } from 'pg';

export default async function executeQuery(sql: string, values: any[]){
  const client = new Client({
    user: process.env.dbUsername || 'carlyjenkinson',
    password: process.env.dbPassword,
    database: process.env.dbDatabase || 'diary',
    host: process.env.dbHost || 'localhost'
  })
  await client.connect()

  const result = await client.query(sql, values)
  await client.end()
  return result;
}