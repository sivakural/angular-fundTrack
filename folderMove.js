const fse = require("fs-extra");
const srcDir = process.cwd() + "/dist"
const destDir = "D:/sivaprakash/nodejs";

// To mova a folder from one to another
try {
    fse.copySync(srcDir, destDir, { overwrite: true|false })
    console.log('success!')
} catch (error) {
    console.log(error);
}