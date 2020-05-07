import i18nTranslatorForJsonTemplates from '../index';

const lang = require('./lang.json');
const template = require('./json_template.json');
const result = require('./result.json');
test('i18nTranslatorForJsonTemplates', () => {
  console.time('s');
  let res = '';
  for (let i = 0; i < 10000; i++)
    res = i18nTranslatorForJsonTemplates(lang, {
      instance: {
        id: 2,
        name: 'cobo',
        specification: {
          platformType: '{{command.instance.specification.platformType}}',
          ownershipMode: 'COBO',
          version: 1,
          description: '{{command.instance.specification.description}}',
          label: '{{command.instance.specification.label}}',
        },
        root: [
          {
            key: 'command.device.alarm',
            title: '{{command.instance.root.device_alarm.title}}',
            description: '{{command.instance.root.device_alarm.description}}',
            type: 'notify_only',
            tips: [
              {
                title: '{{command.instance.root.device_alarm.tips.info.title}}',
                description: '{{command.instance.root.device_alarm.tips.info.description}}',
                side: 'left',
                icon: 'info.svg',
              },
              {
                title: '{{command.instance.root.device_alarm.tips.os.title}}',
                description: '{{command.instance.root.device_alarm.tips.os.description}}',
                side: 'left',
                icon: 'os.svg',
              },
            ],
            args: [
              {
                inputField: {
                  name: 'command.device.alarm.timestampz',
                  title: '{{command.instance.root.device_alarm.args.inputField.timestampz.title}}',
                  type: 'dateTimePicker',
                  isNecessary: true,
                  defaultValue: '',
                  min: '2020/01/01 00:00',
                  max: '2024/12/29 23:00',
                  labelValuePairs: [
                    {
                      value: '',
                      label:
                        '{{command.instance.root.device_alarm.args.inputField.timestampz.labelValuePairs.first.label}}',
                      hints:
                        '{{command.instance.root.device_alarm.args.inputField.timestampz.labelValuePairs.first.hints}}',
                    },
                  ],
                },
              },
              {
                inputField: {
                  name: 'command.device.alarm.force',
                  title: '{{command.instance.root.device_alarm.args.inputField.force.title}}',
                  type: 'checkbox',
                  isNecessary: false,
                  defaultValue: false,
                  labelValuePairs: [
                    {
                      value: true,
                      label: '{{command.instance.root.device_alarm.args.inputField.force.labelValuePairs.first.label}}',
                      hints: '{{command.instance.root.device_alarm.args.inputField.force.labelValuePairs.first.hints}}',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    });
  console.timeEnd('s');
  expect(res).toEqual(result);
});
