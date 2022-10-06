// This pulls covid data from Santa Clara County into Google Sheets for processing
//

function fetchData() { 
  var response = UrlFetchApp.fetch("https://data.sccgov.org/resource/6cnm-gchg.json");

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("collated by week");

  // Clear sheet. Set column names
  sheet.clearContents();
  sheet.appendRow(["Week of 2020", "Sunday", "Monday",	"Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);

  // Parse the JSON reply
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  // Manipulate data for insertion
  var allValues = [];
  var rowCounter = 0;
  var itemIndex = 0;

  // Data starts on a Monday so fill in first Sunday
  data.unshift({"new_cases":0});////////////

  while(itemIndex < data.length){
    // Create new row or else it overwrites old copies in allValues
    var row = new Array(8);
    
    // First item is week of 2020
    row[0] = rowCounter;

    // Loop over the week. Break when we hit Saturday
    for(var j = 1; j < 8 ; j++){      
      row[j] = data[itemIndex]["new_cases"];  
      itemIndex++;

      // Out of data
      if(itemIndex == data.length)
        break;
    }

    // Add row to the end  
    allValues.push(row);

    rowCounter++;
  }

  // Populate sheet  
  var startRow = 2;
  var startColumn = 1;
  var numberOfRows = rowCounter;
  var numberOfColumns = 8;
  var range = SpreadsheetApp.getActiveSheet().getRange(startRow, startColumn, numberOfRows, numberOfColumns);
  range.setValues(allValues);
}
