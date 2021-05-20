import { CCFW, App, capitalize, slugify } from './global';
import { element, groupHeading, groupAllowlistConfirm } from './element';
import { Select, Option, Input, Button } from './form';
import { Icon } from './icons';

'use strict';

const Init = () => {
    return SectionSelect();
};

// create a new top level category i.e.
const SectionSelect = (options) => {
    let defaultOptions = [
        'Marketing',
        'Third-party',
        'Essential'
    ];

    if (options) {
        options.forEach((item) => {
            defaultOptions.push(item);
        });
    }

    return Select(CCFW.sectionId, defaultOptions.reverse(), Section);
};

function Section () {
    let select = $(this);
    let section = select.val();
    let container = element('div', { id: 'ccfw-section__' + section, 'class': 'ccfw-section' }).data('id', section);
    let buttonRemove = element('button', {
        type: 'button',
        id: 'ccfw-' + section + '-section-remove',
        'class': 'ccfw-section-remove',
        title: 'Removes the ' + section + ' section and all related cookies'
    });

    // store the section
    App.section.add(section);

    buttonRemove.append(Icon.bin());
    container.append(buttonRemove);
    container.append(element('h2').text(capitalize(section) + ' Cookies'));

    // Group
    container.append(Group(section));

    // add to the page
    $('#' + CCFW.appContainer).prepend(container);

    // listeners
    groupSaveListener(section);
    $('#ccfw-' + section + '-section-remove').on('click', deleteSection);

    select.find('option[value=' + section + ']').remove();
    hideShowSectionSelect();
}

const Group = (section) => {
    let group = element('div', { 'class': 'ccfw-group' });
    let groupAction = element('div', { 'class': 'ccfw-group-define' });
    let buttonSave = element('button', {
        type: 'button',
        'class': 'ccfw-' + section + '-group-save',
        title: 'Create a group'
    });
    buttonSave.append(Icon.save(22));

    group.append(groupHeading());
    groupAction.append(Input('ccfw-group__input'));
    groupAction.append(buttonSave);

    group.append(groupAction);
    return group;
};

function saveGroup () {
    let section = $(this).closest('div.ccfw-section');
    let group = $(this).closest('div.ccfw-group');
    let name = group.find('input').val();
    let nameSlugged = slugify(name);
    let sectionName = section.data('id');

    if (!name) {
        console.warn('Group name was empty.');
        return;
    }

    if (App.group.exists(sectionName, nameSlugged)) {
        alert('The group "' + name + '" already exists. Please chose another name.');
        return;
    }

    // store the value
    App.group.add(sectionName, name);

    // track the group by named id
    group.data('id', nameSlugged);

    // update heading
    group.html(groupHeading(name + ' ' + Icon.success(18)));
    group.append(Input('gtm-allowlist-id', 'GTM allow list ID'));
    group.append(Button('ccfw-' + nameSlugged + '-allowlist-save', Icon.check(18)));
    group.append(Button('ccfw-cookie-row-add', Icon.add(20), 'Add cookie'));

    // drop first cookie row
    group.append(Cookies());
    App.cookies.add(sectionName, name, 'row_0');

    // move input and header below the row
    section.append(Group(sectionName));

    // listeners
    groupSaveListener(sectionName);
    allowlistIDSaveListener(nameSlugged);
    rowAddListener(group);
    rowRemoveListener(group);
    rowSaveListener();
}

function saveAllowListID () {
    let section = $(this).closest('div.ccfw-section');
    let group = $(this).closest('div.ccfw-group');
    let input = group.find('input[name=gtm-allowlist-id]');
    let allowlistID = input.val();

    App.group.allowlistID(section.data('id'), group.data('id'), allowlistID);

    group.find('.ccfw-group__heading').after(groupAllowlistConfirm(allowlistID));
    input.next('button').remove();
    input.remove();
}

const groupSaveListener = (section) => {
    let element = $('.ccfw-' + section + '-group-save');
    element.off('click', saveGroup);
    element.on('click', saveGroup);
};

const allowlistIDSaveListener = (group) => {
    let element = $('.ccfw-' + group + '-allowlist-save');
    element.on('click', saveAllowListID);
};

const rowAddListener = () => {
    let element = $('.ccfw-cookie-row-add');
    element.off('click', addRow);
    element.on('click', addRow);
};

const rowRemoveListener = () => {
    let element = $('.ccfw-cookie-remove');
    element.off('click', removeRow);
    element.on('click', removeRow);
};

const rowSaveListener = () => {
    let element = $('.ccfw-cookie-row input');
    element.off('keyup', saveCookieData);
    element.on('keyup', saveCookieData);
};

function deleteSection () {
    let section = $(this).parent('div').data('id');
    let confirm = window.confirm('\nAre you sure you want to remove ' + section + ' cookies?');

    if (confirm) {
        // remove the section
        $('#ccfw-section__' + section).remove();

        App.section.remove(section);

        // add option to the select
        $('#' + CCFW.sectionId).append(Option(capitalize(section)));
        hideShowSectionSelect();
    }
}

const hideShowSectionSelect = () => {
    if ($('#' + CCFW.sectionId + ' option').length > 1) {
        $('#' + CCFW.sectionId).show();
    } else {
        $('#' + CCFW.sectionId).hide();
    }
};

const Cookies = () => {
    let container = element('div', { 'class': 'ccfw-cookie-container' });
    container.append(Row(0));
    return container;
};

function addRow () {
    let container = $(this).siblings('.ccfw-cookie-container');
    let count = container.find('.ccfw-cookie-row').length;
    let section = $(this).closest('div.ccfw-section').data('id');
    let group = $(this).closest('div.ccfw-group').data('id');
    let validId = false;

    // manage row counts and ID's
    while (validId === false) {
        if (App.cookies.row.exists(section, group, 'row_' + count)) {
            count++;
        } else {
            validId = true;
            break;
        }
    }

    container.append(Row(count));

    App.cookies.add(section, group, 'row_' + count);
    rowSaveListener();
    rowRemoveListener();
}

function saveCookieData () {
    let input = $(this);
    let section = input.closest('div.ccfw-section').data('id');
    let group = input.closest('div.ccfw-group').data('id');
    let row = input.parent().data('id');
    let name = input.prop('name');
    let value = input.val();

    App.cookies.update(section, group, row, name, value);
}

function removeRow () {
    let section = $(this).closest('div.ccfw-section').data('id');
    let group = $(this).closest('div.ccfw-group').data('id');
    let row = $(this).parent();
    let rowId = row.data('id');

    App.cookies.remove(section, group, rowId);

    row.remove();
}

const locationData = (ele) => {
    return {
        section: ele.closest('div.ccfw-section').data('id'),
        group: ele.closest('div.ccfw-group').data('id')
    };
}

const Row = (id) => {
    // markup
    let row = element('div', { 'class': 'ccfw-cookie-row' }).data('id', 'row_' + id);

    row.append(Input('name', 'Name'));
    row.append(Input('description', 'Description'));
    row.append(Input('expiry', 'Expiry'));
    row.append(Button('ccfw-cookie-remove', Icon.crossArrow(30)));

    return row;
};

export { Init };
