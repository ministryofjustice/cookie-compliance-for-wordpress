import { Icon } from './icons';

const element = (element, attributes) => jQuery('<' + element + '/>', attributes || null);

const groupHeading = (name) => element('span', {'class': 'ccfw-group__heading'}).html('Group name: <span>' + (name || '') + '</span>');

export { element, groupHeading };
