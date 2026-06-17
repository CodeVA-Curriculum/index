# INDEX

The place for all the things.

## Roadmap

- [x] Return activities from pacing guide search
- [x] Render activities in Carousel
- [x] Fix activity nav
- [x] Write instructions for /pacing-guide-creator
- [x] Make image for pacing guide
- [x] Fix /learn/tools
- [x] Fix /learn
- [ ] Migrate activities to database
- [ ] Create activity grid (optional) (/teach/tools/pacing-guide-creator/activities)
- [x] Track trail guide completion in the database
  - [x] Track practice questions
  - [x] Track prompts
  - [x] Track nodes
  - [x] Track projects
- [x] Make DetailIcons responsive to node stats
  - [x] Make Node icons responsive
  - [x] Make Project icons responsive
- [x] Render quick takes in the trail guide (add toggle to node banner)
- [x] Render code-and-image in the trail guide (fix image source link)
- [x] Fix images
- [x] Fix guide video
- [ ] Implement library search
- [ ] Complete "view PDF of library element" workflow
- [/] Complete "save element to backpack" workflow
- [/] Complete "view saved elements" workflow
- [/] Complete "save library element" workflow
- [/] Render trail guide progress dashboards for users/access codes
- [/] Add standard search to StandardSelect

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
