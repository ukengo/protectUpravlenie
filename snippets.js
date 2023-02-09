function unProtect(ss) {
  const protections = ss.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  for (let i = 0; i < protections.length; i++) {
    const protection = protections[i];
    if (protection.canEdit()) {
      protection.remove();
    }
  }
}

function protects(sheet, row, col, rows, cols) {
  const protection = sheet.getRange(row, col, rows, cols).protect().setDescription('Рядок закритий. Внесіть суму коригування окремим рядком.');
  const me = Session.getEffectiveUser();
  protection.addEditor(me);
  protection.removeEditors(protection.getEditors());
  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }
}

// пропускаем пустоты
function noBlank(values, row) {
  const index = values.map(x => x[0]).findIndex(val => val != '');
  return row + index;
}

// знаходимо номер останнього заповненого рядка
function numberLastRow(sheet, range) {
  const dataValues = sheet.getRange(range).getValues();
  const row = dataValues.flat().indexOf('');
  return row + 1;
}