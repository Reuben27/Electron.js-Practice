const electron = require("electron");
const { ipcRenderer } = electron;

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '473236609433-bsunp8lbeannucdc8m0om4ueph6iaue6.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require('./client_secret.json');

async function accessSpreadsheet(){    
    const doc = new GoogleSpreadsheet('1wK6xv92DiMobXxDvHLEYssk9D-BTqKz471GFEe5K9Rc');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    //console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);

    var rows = await sheet.getRows();
    rows = rows.map(a => a._rawData);
    var headerRow = sheet.headerValues;

    var database = [];
    for (let i = 0; i < rows.length; i++) {
        let firstArray = rows[i];
        let secondArray = headerRow;
        let arrayOfObject = secondArray.map(function (value, index) {
        return [value, firstArray[index]]
        });
        let obj = Object.fromEntries(arrayOfObject);
        database.push(obj);
    }

    //console.log(database);
    return database;
}

async function displaySpreadsheet(){
    const database = await accessSpreadsheet();
    console.log(database);
}

window.onload = async function() {
    const database = await accessSpreadsheet();
    displaySpreadsheet();

    var datables = [];
    database.forEach(function (value) {
        var currObj = [];
        for (var key of Object.keys(value)) {
            currObj.push(value[key]);
        }
        datables.push(currObj);
    });

    $("#table_id").DataTable().clear();
    datables.forEach(function (value) {
      $("#table_id").DataTable().row.add(value);
    });
    $("#table_id").DataTable().draw();
}

