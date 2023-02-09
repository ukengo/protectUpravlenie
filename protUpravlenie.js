function protect() {
  // получаем таблицу
  const url = 'https://docs.google.com/spreadsheets/d/1xdJVfecdUCgtF_SHiC_IHbl8FP0Agl3slV_osyj6kxo/edit#gid=0';
  const sheetName = 'База';
  const ss = SpreadsheetApp.openByUrl(url);
  const sheet = ss.getSheetByName(sheetName);

  // сбрасываем все ранее установленные защиты
  unProtect(sheet);

  // получаем весь массив таблицы
  const valuesStart = sheet.getDataRange().getValues();

  // берем в работу первую часть заполненного массива (стартовая установка)

  // находим индекс последнего заполненного значения в блоке
  let indexEndnoBlank = valuesStart.map(x => x[0]).indexOf('');
  // защищаем первый диапазон  
  protects(sheet, 1, 1, indexEndnoBlank, valuesStart[0].length);


  let indexStart = indexEndnoBlank + 1;

  for (let i = 0; i < 10000; i++) {
    // берем второй диапазон после первого
    values = sheet.getRange(indexStart, 1, valuesStart.length, valuesStart[0].length).getValues();

    // находим индекс первого элемента следующего блока с данными (пропускаем пустоты)
    indexStartnoBlank = noBlank(values, indexStart);
    
    // берем второй диапазон после первого уже без пустот
    values = sheet.getRange(indexStartnoBlank, 1, valuesStart.length, valuesStart[0].length).getValues();

    // находим индекс последнего заполненного значения в блоке
    indexEndBlock = values.map(x => x[0]).indexOf('');
    
    if (!indexEndBlock) return;

    // защищаем 
    protects(sheet, indexStartnoBlank, 1, indexEndBlock, values[0].length);

    // находим начало следующего блока
    indexStart = indexStartnoBlank + indexEndBlock + 1;
  }
}