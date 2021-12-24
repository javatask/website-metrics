const testFolder = "./tests/";
const fs = require("fs");

const indir = "./tls";
const outdir = "./tls-scan";
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

      if (d.scanResult.length === 0) {
        return;
      }

      d1.Invocation = d.Invocation;
      d1.version = d.version;
      d1.openssl = d.openssl;
      d1.startTime = d.startTime;
      d1.targetHost = d.scanResult[0].targetHost;
      d1.ip = d.scanResult[0].ip;
      d1.port = d.scanResult[0].port;
      d1.service = d.scanResult[0].service;

      if (!d.scanResult[0].rating || d.scanResult[0].rating.length === 0) {
        return;
      }

      d1.signatureAlgorithm = d.scanResult[0].serverDefaults.filter(
        (el) => el.id === "cert_signatureAlgorithm"
      )[0];
      d1.keySize = d.scanResult[0].serverDefaults.filter(
        (el) => el.id === "cert_keySize"
      )[0];
      d1.cert_caIssuers = d.scanResult[0].serverDefaults.filter(
        (el) => el.id === "cert_caIssuers"
      )[0];
      d1.rating = {};

      d.scanResult[0].rating.forEach(({ id, severity, finding }) => {
        d1.rating[id] = { severity, finding };
      });

      fs.writeFileSync(`${outdir}/${file}`, JSON.stringify(d1));
    });
  });
});
