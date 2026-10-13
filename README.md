# INDEX

The place for all the things.

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

If you're starting from a development repo, kill all the `session`, `access_code`, and `user` records. Then, make the admin user record.

Then, build the docker image, replacing the version number in the command below:

```
sudo docker build -t index:[version] .
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
sftp ubuntu@[static ip] -i /path/to/keyfile
put index-new.tar index-new.tar
exit
```

Then shell into the VPS, load the new image, and run it:

```
ssh ubuntu@[static ip] -i /path/to/keyfile
sudo docker image load -i index-new.tar
sudo docker run -d -e PROTOCOL_HEADER=x-forwarded-proto -e HOST_HEADER=x-forwarded-host -e ORIGIN=https://foundry.codevirginia.org -p 3000:3000 --mount type=bind,source=/app/data,target=/app/data index:[version]
```

Configure the server to run the app image on startup if that hasn't already been done, and verify that the application is running correctly on port 3000 on the VPS.

The DNS and HTTPS support are provided by [caddy](TODO). The configuration for caddy is at `/etc/caddy/Caddyfile`.

### Deployment Troubleshooting

- **Site available at static IP on port 3000, but not at the configured DNS subdomain:** The problem is with caddy or with the Cloudflare DNS A record pointing to the VPS static IP. Verify that Cloudflare is connecting to the VPS, check the `journalctl` logs on the VPS, or restart the `caddy` service with `sudo systemctl restart caddy`

## Site Map

### /learn

This where all the trail guides live.

### /teach

This where all the teacher stuff lives.
