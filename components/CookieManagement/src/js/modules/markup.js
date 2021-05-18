import { CCFW, addSection, addGroup, capitalize } from './global';
import { element, groupHeading } from './element';
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
    addSection(section);

    buttonRemove.append(Icon.bin());
    container.append(buttonRemove);
    container.append(element('h2').text(capitalize(section) + ' Cookies'));

    // Group
    container.append(Group(section));

    // add to the page
    $('#' + CCFW.appContainer).prepend(container);

    // listeners
    groupSaveListener(section);
    $('#ccfw-' + section + '-section-remove').on('click', removeSection);

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
    let sectionName = section.data('id');
    let name = group.find('input').val();

    // store the value
    addGroup(sectionName, name);

    // update heading
    group.html(groupHeading(name + ' ' + Icon.check(18)));

    // drop first cookie row
    group.append(Cookies());

    // move input and header below the row
    section.append(Group(sectionName));

    groupSaveListener(sectionName);
    rowAddListener(group)
}

const groupSaveListener = (section) => {
    let element = $('.ccfw-' + section + '-group-save');
    element.off('click', saveGroup);
    element.on('click', saveGroup);
};

const rowAddListener = (group) => {
    let element = $('.ccfw-cookie-add');
    element.off('click', addRow);
    element.on('click', addRow);
};

function removeSection () {
    let id = $(this).parent('div').data('id');

    // remove the section
    $('#ccfw-section__' + id).remove();
    delete CCFW.sections[id];

    // add option to the select
    $('#' + CCFW.sectionId).append(Option(capitalize(id)));
    hideShowSectionSelect();
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
    container.append(Row);
    return container;
};

function addRow() {
    $(this).closest('.ccfw-cookie-container').append(Row())
}

const Row = () => {
    // markup
    let row = element('div', { 'class': 'ccfw-cookie-row' });

    row.append(Input('gtm-id', 'GTM ID'));
    row.append(Input('cookie-name', 'Name'));
    row.append(Input('description', 'Description'));
    row.append(Input('expiry', 'Expiry'));
    row.append(Button('ccfw-cookie-add', Icon.add(20)));
    row.append(Button('ccfw-cookie-remove', Icon.crossArrow(30)));

    return row;
};

/**
 * Helpers
 */
const Rows = {
    add: Row(),
    remove: {},
    cache: {}, // local storage - leave until last
    save: {} // clear local storage after save
};

export { Init, Rows };
