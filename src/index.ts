/*
	Package Name: i18n-translator-for-json-templates
  Author: Seyyedmahdi hassanpour
  email:seyyedkhandon@gmail.com
*/

const { reduce, pipe, drop, dropRight, join, path, replace } = require('lodash/fp');
export const util_findMatchesByPattern = (text: string = '', pattern: RegExp = /(.?)*/): string[] =>
  text.match(pattern) || [];

export const util_findFirstMatchByPattern = (...args: any): string => {
  let result = util_findMatchesByPattern(...args);
  return result.length > 0 ? result[0] : '';
};
const i18nTranslatorForJsonTemplates = (
  language_json: any,
  template_json: any,
  start_of_pattern = '{{',
  end_of_pattern = '}}',
) => {
  const stringTemplate = JSON.stringify(template_json);
  const findAllSubstitutionTemplates = (text: string) =>
    util_findMatchesByPattern(text, new RegExp(`${start_of_pattern}[\\w.]+${end_of_pattern}`, 'g'));
  const useSubstitution = (init: string, array: string[]) =>
    reduce((acc: string, curr: string) => {
      return pipe(
        drop(start_of_pattern.length),
        dropRight(end_of_pattern.length),
        join(''),
        (_: string) => path(_, language_json),
        (_: string) => replace(curr, _, acc),
      )(curr);
    }, init)(array);
  return pipe(
    JSON.stringify,
    findAllSubstitutionTemplates,
    (templates: string[]) => useSubstitution(stringTemplate, templates),
    JSON.parse,
  )(template_json);
};

export default i18nTranslatorForJsonTemplates;
