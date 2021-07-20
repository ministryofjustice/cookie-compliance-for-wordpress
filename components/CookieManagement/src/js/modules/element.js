import { Icon } from './icons';

const element = (element, attributes) => jQuery('<' + element + '/>', attributes || null);

const groupName = (name) => {
    if (!name) {
        return null;
    }
    return name + ' ' + Icon.success(18);
}
const groupHeading = (name) => element('span', {'class': 'ccfw-group__heading'}).html('Group name: <span>' + (groupName(name) || '') + '</span>');

export { element, groupName, groupHeading };
