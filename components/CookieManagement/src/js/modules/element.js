const element = (element, attributes) => jQuery('<' + element + '/>', attributes || null);

const groupHeading = (name) => element('span', {'class': 'ccfw-group__heading'}).html('Group name: <span>' + (name || '') + '</span>');
const groupAllowlistConfirm = (id) => element('span', {'class': 'ccfw-group__allowlist'}).html('Allowlist ID: <span>' + (id || '') + '</span>');

export { element, groupHeading, groupAllowlistConfirm };
