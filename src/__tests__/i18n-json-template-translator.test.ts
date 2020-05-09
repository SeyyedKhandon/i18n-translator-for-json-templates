import i18nTranslatorForJsonTemplates from '../index';

const lang = require('./lang.json');
const template = require('./json_template.json');
const result = require('./result.json');
test('i18nTranslatorForJsonTemplates', () => {
  console.time('s');
  let res = '';
  for (let i = 0; i < 10000; i++) res = i18nTranslatorForJsonTemplates(lang, template);
  console.timeEnd('s');
  expect(res).toEqual(result);
});
