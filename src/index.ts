/*
	Package Name: i18n-translator-for-json-templates
  Author: Seyyedmahdi hassanpour
  email:seyyedkhandon@gmail.com
*/

const path = require('lodash/fp/path');
const prepareRegexPattern = (start: string, end: string) => new RegExp(`${start}[\\w.]+${end}`);
const preparePatternRemoverFromText = (start: string, end: string) => (text: string) =>
  text.slice(start.length, text.length - end.length);
const i18nTranslatorForJsonTemplates = (
  language_json: any,
  template_json: any,
  start_of_pattern = '{{',
  end_of_pattern = '}}',
) => {
  const pattern = prepareRegexPattern(start_of_pattern, end_of_pattern);
  const patternRemover = preparePatternRemoverFromText(start_of_pattern, end_of_pattern);
  const dfs = (tree: any) => {
    if (typeof tree === 'object') {
      Object.keys(tree).forEach((key: string) => {
        tree[key] = dfs(tree[key]);
      });
    } else if (Array.isArray(tree)) {
      tree.forEach((branch: any, index: number) => {
        tree[index] = dfs(branch);
      });
    } else if (typeof tree === 'string') {
      if (tree.match(pattern)) {
        tree = path(patternRemover(tree), language_json);
      }
    }
    return tree;
  };
  return dfs(template_json);
};

export default i18nTranslatorForJsonTemplates;
