function protectIrinaCounts() {
  // отримуємо таблицю
  const url = 'https://docs.google.com/spreadsheets/d/1bd-YnMzDO8An3pGAniQXbFAPC1IWq5SSBlHK0pW2hVI/edit#gid=1139650230';
  const sheetName = 'СЧЕТА';
  const ss = SpreadsheetApp.openByUrl(url);
  const sheet = ss.getSheetByName(sheetName);

  // видаляємо захисти, що раніше встановлені
  unProtect(sheet);

  // отримуємо весь масив таблиці Ірина Рахунки
  const valuesStart = sheet.getDataRange().getValues();

  //відбираємо всі записи з прапорцем
  const valueBuhTrue = valuesStart.filter(x => x[5] === true).filter(x => x[0] != '');

  // захищаємо
  protects(sheet, 1, 1, valueBuhTrue.length+1, valueBuhTrue[0].length);
  protects(sheet, 1, 2, valuesStart.length, 1);
  protects(sheet, 1, 5, valuesStart.length, 1);
}