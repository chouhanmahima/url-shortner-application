import express from "express";
import { nanoid } from "nanoid";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve HTML form for URL shortening
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/urlForm.html");
});

// Check if URL is Valid or not
const isValidUrl = (url) => {
    try{
        new URL(url);
        return true;
    }
    catch (err){
        return false;
    }
};

/******************************************************************************************************
 * 1. Create an API which takes long URL as input and gives short URL as output by using Post Method
 ******************************************************************************************************/

app.post("/url-shortner", (req, res) => {
    if (!isValidUrl(req.body.url)) {
        return res.status(400).json({
          success: false,
          message: "Invalid URL, please validate the URL sent in request body",
        });
      }
    const shortUrl = nanoid(8);
    const urlMap = {
        [shortUrl] : req.body.url,
    };

    // Map short and long url and save them in the json file
    const urlFileData = fs.readFileSync("urlmap.json", { encoding: "utf-8" }); //* 1. Read data from exisitng file
    const urlFileDataJson = JSON.parse(urlFileData); //* 2. Parse it in the form of JSON
    urlFileDataJson[shortUrl] = req.body.url; // New URL entry * 3. Add the data to the JSON
    fs.writeFileSync("urlmap.json", JSON.stringify(urlFileDataJson)); //* 4. Write the new data set to the JSON file

    res.json({
        success : true,
        data: `http://localhost:5000/${shortUrl}`,
    });

});

/****************************************************************************************************************
 * 2. Another end point which takes short URL and redirects the user to original (long) url by using Get Method
 ****************************************************************************************************************/
app.get("/:shortUrl", (req, res) => {
    const fileData = fs.readFileSync("urlmap.json", { encoding: "utf-8" });
    const fileDataJson = JSON.parse(fileData);
    const shortUrl = req.params.shortUrl;
    const longUrl = fileDataJson[shortUrl]; //will be my Original long url
    if (!longUrl) {
        return res.status(404).json({
             success: false,
             message: "Short URL not found"
        });
      }
    res.redirect(longUrl); // it will redirect to original url
    res.json({
        message : "Short url received",
        longUrl,
    });

});

app.listen(PORT,()=>{
    console.log("Server up and running at port -", PORT);
});