# INDEX

The place for all the things.

## Roadmap

This section contains feature and release plans for future versions of the website.

### v1.0

- [ ] Deploy

### v1 content update

- [ ] Python Trail Guide starter project
- [ ] Processing Trail Guide starter project
- [ ] p5js Trail Guide starter project
- [ ] Write twine caches
- [ ] Film new videos
- [ ] Migrate activities to database
- [ ] Create activity grid (optional) (/teach/tools/pacing-guide-creator/activities)

### v1.1

- [ ] Fix library image (/teach)
- [ ] Implement tag search in SearchBar
- [ ] Connect to HubSpot purchases
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

First, clone the repo, download the library PDFs locally, and seed the database (if needed):

```
git clone https://github.com/codeva-curriculum/index
cd index
mkdir data
yarn && yarn db:push && yarn db:seed
sudo docker run -d -p 3000:3000 \
sudo docker build -t index-deploy
  --mount type=bind,source="$(pwd)"/data,target=/app/data \
  index-deploy
```

Finally, configure the server to run the app image on startup if that hasn't already been done.

## Site Map

### /learn

This where all the trail guides live.

### /teach

This where all the teacher stuff lives.
