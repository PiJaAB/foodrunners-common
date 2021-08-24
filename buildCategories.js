/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const rawCat = require('./rawCat.json');

const idMap = {};

function extractCategories(obj, path = []) {
  const { values } = obj;
  if (values == null) return;
  Object.entries(values).forEach(([catID, el]) => {
    const name = el.name.sv;
    idMap[catID] = {
      name,
      parents: path.slice().reverse(),
    };
    extractCategories(el, [...path, catID]);
  });
}

extractCategories(rawCat);

fs.writeFileSync('categoryIdMap.json', JSON.stringify(idMap), 'utf-8');
