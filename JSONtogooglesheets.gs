// This pulls covid data from Santa Clara County into Google Sheets for processing
//

function fetchData() { 
  var response = UrlFetchApp.fetch("https://data.sccgov.org/resource/6cnm-gchg.json");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("importeddata");

  // Clear sheet. Set column names
  sheet.clearContents();
  sheet.appendRow(["date","new_cases",'weekday']);

  // Parse the JSON reply
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  // Manipulate data for insertion
  var values = [];
  for(var i=0;i<data.length;i++){
    var dateObject= new Date(data[i]["date"]);
    var weekday = dateObject.toLocaleDateString('en-US', { weekday: 'long' }); 
    values.push([data[i]["date"],data[i]["new_cases"], weekday]);
  }

  // Populate sheet  
  var startRow = 2;
  var startColumn = 1;
  var numberOfRows = data.length;
  var numberOfColumns = 3;
  var range = SpreadsheetApp.getActiveSheet().getRange(startRow, startColumn, numberOfRows, numberOfColumns);
  range.setValues(values);
}
 
