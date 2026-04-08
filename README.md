# index

The place for all the things.

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
