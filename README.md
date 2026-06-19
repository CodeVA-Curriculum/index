# INDEX

The place for all the things.

## Roadmap

This section contains feature and release plans for future versions of the website.

### v1.0

- [ ] Migrate activities to database
- [ ] Create activity grid (optional) (/teach/tools/pacing-guide-creator/activities)
- [x] Implement library search
  - [x] Implement text search
  - [x] Implement filters
- [ ] Complete "view PDF of library element" workflow
- [ ] Fix library image (/teach)
- [ ] Implement filter search in trail guide Panel
- [ ] Disable logins temporarily
- [ ] Create automated deployment & backup scripts

### v1.1

- [ ] Implement tag search in SearchBar
- [ ] Connect to HubSpot purchases
- [ ] Implement paywall
- [ ] Complete "save element to backpack" workflow
- [ ] Complete "view saved elements" workflow
- [ ] Complete "save library element" workflow
- [ ] Render trail guide progress dashboards for users access codes
- [ ] Add standard search to StandardSelect

## Deployment

Dis: https://youtu.be/LwzoWuHjOWk?si=5aoLNSs4nT0xhDTY

First, clone the repo and seed the database (if needed):

```
git clone https://github.com/codeva-curriculum/index
cd index
mkdir data
yarn && yarn db:push && yarn db:seed
```

Then, build an image on the VPS using the `Dockerfile` in the repo:

```
sudo docker build -t index-deploy
```

Run the docker image to start the app:

```
sudo docker run -d -p 3000:3000 \
  --mount type=bind,source="$(pwd)"/data,target=/app/data \
  index-deploy
```

Finally, configure the server to run the app image on startup if that hasn't already been done.

## Site Map

### /learn

This where all the trail guides live.

### /teach

This where all the teacher stuff lives.
