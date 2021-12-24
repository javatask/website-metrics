const testFolder = "./tests/";
const fs = require("fs");

const indir = "./perf";
const outdir = "./perf-scan";
fs.mkdir(outdir, (e) => console.log(e));

fs.readdir(indir, (err, files) => {
  files.forEach((file) => {
    console.log(`${indir}/${file}`);
    if (fs.lstatSync(`${indir}/${file}`).isDirectory()) {
      return;
    }
    fs.readFile(`${indir}/${file}`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const d = JSON.parse(data);
      const d1 = {};
      d1.lighthouseVersion = d.lighthouseVersion;
      d1.requestedUrl = d.requestedUrl;
      d1.finalUrl = d.finalUrl;
      d1.gatherMode = d.gatherMode;
      d1.categories = d.categories;
      fs.writeFileSync(`${outdir}/${file}`, JSON.stringify(d1));
    });
  });
});
