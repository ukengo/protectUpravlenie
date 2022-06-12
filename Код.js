

function protect() {
  const url = 'https://docs.google.com/spreadsheets/d/1pP9_3fDomYlUttzxvIK531FWRRFFWOnMi_4MQvcl3ps/edit#gid=0'
const sheetName = 'База'
  
  const ss = SpreadsheetApp.openByUrl(url)
  const sheet = ss.getSheetByName(sheetName)
  const values = sheet.getDataRange().getValues()
  console.log(values)
  for (let i = 0; i < values.length; i++) {
    if (values[i][0]) {
      var protection = sheet.getRange(i + 1, 1, 1, values[0].length).protect().setDescription('Sample protected sheet');
      var me = Session.getEffectiveUser();
      protection.addEditor(me);
      protection.removeEditors(protection.getEditors());
      if (protection.canDomainEdit()) {
        protection.setDomainEdit(false);
      }
    }
  }
}


function unPropert() {
  const ss = SpreadsheetApp.openByUrl(url)
  var protections = ss.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  console.log(protections)
  for (var i = 0; i < protections.length; i++) {
    var protection = protections[i];
    if (protection.canEdit()) {
      protection.remove();
    }
  }
}