# INDEX

The place for all the things.

## Roadmap

This section contains feature and release plans for future versions of the website.

### v1.0

- [ ] Fix deployment instructions
- [ ] Fix /library
- [ ] Deploy

### v1 content update

- [ ] Create collections
- [ ] Python Trail Guide starter project
- [ ] Processing Trail Guide starter project
- [ ] p5js Trail Guide starter project
- [ ] Write twine caches
- [ ] Film new videos
- [ ] Migrate activities to database
- [ ] Create activity grid (optional) (/teach/tools/pacing-guide-creator/activities)

### v1.1

- [ ] Add solution support for questions
- [ ] Add solution support for prompts
- [ ] Fix library image (/teach)
- [ ] Implement tag search in SearchBar
- [ ] Connect to HubSpot purchases
- [ ] Design element/trail guide permissions scheme
- [ ] Load PDF from endpoint
- [ ] Load trail guide content from endpoint
- [ ] Implement paywall elements
- [ ] Implement paywall projects in trail guide
- [ ] Complete "save element to backpack" workflow
- [ ] Complete "view saved elements" workflow
- [ ] Complete "save library element" workflow
- [ ] Render trail guide progress dashboards for users access codes
- [ ] Add standard search to StandardSelect
- [ ] Create automated deployment & backup scripts
- [ ] Deploy v1.1

## Deployment

Dis: https://youtu.be/LwzoWuHjOWk?si=5aoLNSs4nT0xhDTY

### Updating Content (Database Deployment)

To update the content of the site without updating the application itself (e.g., adding trail guide content, adding elements to the library), simply update the deployment database with the new content. 

First, create a backup of the deployment database on the VPS, and give yourself a local copy:

```
  TODO
```

Next, migrate the content to the local copy of the backup, overwriting the new information and preserving user data. Then, replace the database file on the VPS. 

### Full Deployment from Scratch

First, clone the repo, install dependencies, and seed the local database:

```
git clone https://github.com/codeva-curriculum/index
cd index
touch .env
mkdir data
yarn && yarn db:push && yarn db:seed
```

Then, build the docker image, replacing the version number in the command below:

```
sudo docker build -t index:0.0 .
```

Finally, test the image by running the command below (omit -d to run the application interactively in the shell instead of as a background process):

```
sudo docker run -d -p 3000:3000 \
  --mount type=bind,source="$(pwd)"/data,target=/app/data \
  index:latest
```

> The command above expects to be run in a directory containing a `data` directory with the database and the PDF documents backing the application.

Once everything is working locally, you need to push the new image to the VPS. First, compress the image:

```
sudo docker save index:latest > index-new.tar
```

Transfer the compressed image to the VPS, along with the database and PDF documents.

```
  TODO:
```

Configure the server to run the app image on startup if that hasn't already been done, and verify that the application is running correctly on port 3000 on the VPS.

## Site Map

### /learn

This where all the trail guides live.

### /teach

This where all the teacher stuff lives.
