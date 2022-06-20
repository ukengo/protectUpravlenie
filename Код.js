
function protect() {
  // получаем таблицу
  const url = 'https://docs.google.com/spreadsheets/d/1xdJVfecdUCgtF_SHiC_IHbl8FP0Agl3slV_osyj6kxo/edit#gid=0';
  const sheetName = 'База';
  const ss = SpreadsheetApp.openByUrl(url);
  const sheet = ss.getSheetByName(sheetName);

  // сбрасываем все ранее установленные защиты
  unPropert(sheet);

  // получаем весь массив таблицы
  const valuesStart = sheet.getDataRange().getValues();
  
  ////////////////////////////
  // берем в работу первую часть заполненного массива (стартовая установка)
  let values = valuesStart;
  let indOf = values.map(x => x[0]).indexOf(''); // находим индекс последнего заполненного значения в блоке
  let row = indOf; // переменная с номером последней строки диапазона
  // защищаем первый диапазон  
  protectsss(sheet, 1, 1, indOf, values)
  ////////////////////////////

  ///////////////////////////////////
  // берем второй диапазон после первого
  values = sheet.getRange(row + 1, 1, valuesStart.length, valuesStart[0].length).getValues()
  // пропускаем пустоты
  row = noBlank(values, row)
  // берем второй диапазон после первого уже без пустот
  values = sheet.getRange(row, 1, valuesStart.length, valuesStart[0].length).getValues()
  indOf = values.map(x => x[0]).indexOf('')// находим индекс последнего заполненного значения в блоке
  // защищаем 
  protectsss(sheet, row, 1, indOf, values)
  /////////////////////////////////

  for (let i = 0; i < 10000; i++) {
    row = row + indOf;
    values = sheet.getRange(row + 1, 1, valuesStart.length, valuesStart[0].length).getValues();
    // пропускаем пустоты
    row = noBlank(values, row);
    values = sheet.getRange(row, 1, valuesStart.length, valuesStart[0].length).getValues();
    indOf = values.map(x => x[0]).indexOf('');
    if (!indOf) return;
    protectsss(sheet, row, 1, indOf, values);
  }
}

// пропускаем пустоты
function noBlank(values, row) {
  const index = values.map(x => x[0]).findIndex(val => val != '')
  return row + index + 1
}

function protectsss(sheet, cell, col, indOf, values) {
  const protection = sheet.getRange(cell, col, indOf, values[0].length).protect().setDescription('Защищено. Обратитесь к администратору');
  const me = Session.getEffectiveUser();
  protection.addEditor(me);
  protection.removeEditors(protection.getEditors());
  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }
}

function unPropert(ss) {
  const protections = ss.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  for (let i = 0; i < protections.length; i++) {
    const protection = protections[i];
    if (protection.canEdit()) {
      protection.remove();
    }
  }
}