## How to migrate the database

Run `npm i`.

Edit `database.json` file and `db.ts` to refer to your user name (and add password if necessary).

Run `db-migrate create ` + filename + ` --sql-file` to create a migration.

Run `db-migrate up initialize` to initialize the database.

Run `db-migrate down initialize` to drop the table.
