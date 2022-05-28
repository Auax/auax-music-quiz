const {SitemapStream, streamToPromise} = require('sitemap');
const {Readable} = require('stream');
const fs = require('fs');

// An array with your links
const links = [
    {url: '/', changefreq: 'yearly', priority: 0.9},
    {url: '/choose', changefreq: 'weekly', priority: 1},
    {url: '/create/mode', changefreq: 'yearly', priority: 0.7},
    {url: '/play', changefreq: 'yearly', priority: 0.8},
    {url: '/privacy-policy', changefreq: 'never', priority: 0.2},
];

// Create a stream to write to
const stream = new SitemapStream({hostname: 'https://musicquiz.me'});

// Return a promise that resolves with your XML string
// And save file to sitemap.xml
console.log("Generating sitemap...");
return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    fs.writeFile("public/sitemap.xml", data.toString(), err => {
        if (err) console.log(err);
        else console.log("Created sitemap in `public/sitemap.xml`")
    })
)