import {listEntries} from "./diaryService"
import { Client } from 'pg'

describe('lists entries', () => {
  const values = ["title", "entry", 3, "wwww.test.com", "useruid"]
  let client:Client;

  beforeEach(async ()=>{
    client = new Client({
      user: 'carlyjenkinson',
      database: 'diary_test'
    }) 
    await client.connect()
    return await client.query('DELETE FROM entries')
  });

  it('returns list of entries from the database', async () => {
    await client.query('INSERT INTO entries(title, entry, category_id, link, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *', values)
    const entries = await listEntries()
    expect(entries.length).toEqual(1);
    expect(entries).toEqual([{id: expect.anything(), title: "title", entry: "entry", incomingUserId: 'useruid', date: expect.anything(), edited: expect.anything(), categoryId: 3, link: "wwww.test.com", categoryName: "Clean Code", colourCode: "65, 75, 178",}])
  })

  afterEach(async () => {
    await client.query('DELETE FROM entries')
    return await client.end();
  })
})
