# index

The place for all the things.

## Deployment

This application is hosted on an AWS Lightsail VPS. The server admin panel is available at [TODO:]() courtesy of [CapRover](https://caprover.com/), a server management dashboard and utility. GitHub deploys the `main` branch automatically on commit via a GitHub Action configured in CapRover. The SQLite database which backs this application sits on the VPS disk and is made avaialble to this application by simply mounting a host path to an application container path. The mounting configuration is done via the CapRover admin dashboard. The application expects to see a file called `local.db` at the application root.

I set up the system above based on this video tutorial: https://www.youtube.com/watch?v=NLjolI9FwCU

## Site Map

### /learn

This where all the trail guides live.

### /teach

This where all the teacher stuff lives.
