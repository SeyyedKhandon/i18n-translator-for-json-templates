/*
	Package Name: i18n-translator-for-json-templates
  Author: Seyyedmahdi hassanpour
  email:seyyedkhandon@gmail.com
*/

const R = require('ramda');
const prepareRegexPattern = (start: string, end: string) => new RegExp(`${start}[\\w.]+${end}`);
const preparePatternRemoverFromText = (start: string, end: string) =>
  R.pipe(R.drop(start.length), R.dropLast(end.length));
const path = (obj: any) => R.pipe(R.split('.'), R.path(R.__, obj));
const i18nTranslatorForJsonTemplates = (
  language_json: any,
  template_json: any,
  start_of_pattern = '{{',
  end_of_pattern = '}}',
) => {
  const pattern = prepareRegexPattern(start_of_pattern, end_of_pattern);
  const patternRemover = preparePatternRemoverFromText(start_of_pattern, end_of_pattern);
  const dfs = (tree: any) => {
    switch (R.type(tree)) {
      case 'Object':
      case 'Array':
        return R.map(dfs, tree);
      case 'String':
        return R.when(R.test(pattern), R.pipe(patternRemover, path(language_json)))(tree);
      default:
        return tree;
    }
  };
  return dfs(template_json);
};

export default i18nTranslatorForJsonTemplates;
