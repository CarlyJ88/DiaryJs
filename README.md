## To run the project locally, run the following:

`cd Backend`
`npm run build`
`npm run dev`
`cd ..`
`cd Backend`
`npm run build`
`npm start`

## To run tests locally, run the following:

Run `npm run test` in both Frontend and Backend directories.

## Using Batect

type `./batect --list-tasks` to discover which tasks are available
To run a task just type `./batect` + name of the task
`./batect -o all run-frontend`

### To deploy the app to Heroku run:

Run `./deploy.sh` to deploy the app to Heroku.

To run project on Heroku locally run: `docker run -p 4000:4000 --rm registry.heroku.com/metablogger/web`.

If ther is something already running on the port run `lsof -i tcp:4000` to check what is running on a port.

If there is already something running on the port, run `kill -9` + `process name` to kill what is running on the port.
