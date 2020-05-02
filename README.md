# i18nTranslatorForJsonTemplates

An i18n like translator for json templates(typescript/javascript).

this package has been developed for cases which you want to use a feature like i18n but on json templates which will be fetched from server like
json schema form generators like below example(note:you can use {{}} or any other tags like t() for templateing):

<pre>
//json template
{
      "platformType": "{{specification.platformType}}",
      "ownershipMode": "COBO",
      "version": 1,
      "description": "{{specification.description}}",
      "label": "{{specification.label}}"
}
</pre>
<pre>
//json lang
 {"specification": {
        "platformType": "Android",
        "description": "Command Schema For 'Company Owned/Business Only'",
        "label": "COBO3"
      }
 }
</pre>

<pre>
import i18nTranslatorForJsonTemplates from "i18n-translator-for-json-templates";
const result = i18nTranslatorForJsonTemplates(lang, template);
console.log(JSON.stringify(result));
/*output
 {                                                                       
   "platformType": "Android",                                            
   "ownershipMode": "COBO",                                              
   "version": 1,                                                         
   "description": "Command Schema For 'Company Owned/Business Only'",    
   "label": "COBO3"                                                      
 }                                                                       
*/
</pre>



i18nTranslatorForJsonTemplates takes 4 args, which the last two of the are optionals as below:

<pre>
i18nTranslatorForJsonTemplates = (
  language_json: any,
  template_json: any,
  start_of_pattern = '{{',
  end_of_pattern = '}}',
) => string
</pre>

