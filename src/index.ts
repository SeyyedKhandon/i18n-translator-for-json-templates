/*
	Package Name: i18n-translator-for-json-templates
  Author: Seyyedmahdi hassanpour
  email:seyyedkhandon@gmail.com
*/
const R = require('ramda');
const prepareRegexPattern = (start: string, end: string) => new RegExp(`${start}[\\w.]+${end}`);
const preparePatternRemoverFromText = (start: string, end: string) => (text: string) =>
  text.slice(start.length, text.length - end.length);
const path = (obj: any) => R.pipe(R.split('.'), R.path(R.__, obj));
const i18nTranslatorForJsonTemplates = (
  language_json: any,
  template_json: any,
  start_of_pattern = '{{',
  end_of_pattern = '}}',
  show_tree = true
) => {
  const pattern = prepareRegexPattern(start_of_pattern, end_of_pattern);
  const patternRemover = preparePatternRemoverFromText(start_of_pattern, end_of_pattern);
  const dfs = (tree: any) => {
    switch (R.type(tree)) {
      case 'Object':
      case 'Array':
        return R.map(dfs, tree);
      case 'String':
        if (tree.match(pattern)) {
          const result = path(language_json)(patternRemover(tree));
          return result !== undefined ? result : show_tree ? tree : result;
        }
      default:
        return tree;
    }
  };
  return dfs(template_json);
};

export default i18nTranslatorForJsonTemplates;
