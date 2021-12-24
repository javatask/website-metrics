const testFolder = "./tests/";
const fs = require("fs");

const indir = "./sec";
const outdir = "./sec-scan";
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
      d1.file = file;
      d1.scan = d.scan;
      fs.writeFileSync(`${outdir}/${file}`, JSON.stringify(d1));
    });
  });
});
