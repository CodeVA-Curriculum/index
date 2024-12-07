var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
async function getIds() {
    const res = await (await fetch('http://localhost:5173/api/library/all.json')).json()
    let ids = []
    for(const el of res) {
        // only get the thumbnail if the file isn't a "group"
        if(!el.contents && el.links.drive) {
            let id = el.links.drive//.substring(el.links.drive.indexOf('/d/') + 3)
            if(id.length > 0) {
                ids.push(id)
            }
        }
    }
    return ids
}

async function getThumbnails(ids) {
    for(const id of ids) {
        console.log("downloading" + id)
        download(`https://drive.google.com/thumbnail?sz=w640&id=${id}`, `./static/thumbnails/${id}.png`, function () {
            console.log(`Got thumbnail for ${id}`)
        })
    }
}

async function getFile(id) {
    download(`https://drive.google.com/thumbnail?sz=w640&id=${id}`, `./static/thumbnails/${id}.png`, function () {
        console.log(`Got thumbnail for ${id}`)
    })
}

async function main() {
    const files = await getIds()
    for(const file of files) {
        if(file == "1xM9merQyJEKALJaIKpczHdo33Nj48nPR") {
            console.log("PDF test passed!")
        }
        if(file.includes("1xM9merQyJEKALJaIKpczHdo33Nj48nPR")) {
            console.log("Uhhhhh " + file)
        }
    }
    // getThumbnails(files)
}

main()
