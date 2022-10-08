import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const indexJs = path.basename(__filename);

router.get("/status", (req, res) => res.send("OK!"));
router.get('/dashboard', async(req, res)=> {
  try{
    res.sendFile(path.join(__dirname, '../../../../console/frontend/build/index.html'));
  }catch(e){
    console.log(e);
  }
});

console.log(fs.readdirSync(__dirname), indexJs);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== indexJs && file.slice(-3) === ".js")
  .forEach(routeFile => {
      router.use(`/${routeFile.split(".")[0]}`, require(`./${routeFile}`).default)
});

export default router;