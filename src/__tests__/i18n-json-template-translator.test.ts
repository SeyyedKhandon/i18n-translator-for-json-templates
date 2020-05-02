import { i18nTranslatorForJsonTemplates } from '../index';
const lang = require('./lang.json');
const template = require('./json_template.json');
const result = require('./result.json');
test('i18nTranslatorForJsonTemplates', () => {
  expect(i18nTranslatorForJsonTemplates(lang, template)).toEqual(result);
});
