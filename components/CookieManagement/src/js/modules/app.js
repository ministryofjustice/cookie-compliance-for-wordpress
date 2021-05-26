import { CCFW, App, capitalize, slugify } from './global';
import { listener } from './listeners';
import { element, groupHeading, groupAllowlistConfirm } from './element';
import { Select, Option, Input, Button } from './form';
import { Icon } from './icons';

'use strict';

const Init = () => {
    let select = SectionSelect();
    // grab existing cookies and load them into sections
    App.cookies.get();


    /**
     * shall we populate the UI?
     * todo: create a module that takes existing data and rebuilds the UI
     */


    // listen out for focus and blur events
    listener.form.input.focusBlur(inputFocus);
    // listen out for changes on the debug checkbox
    listener.debug();
    // listen out for submissions on the page
    listener.form.submit(formSubmit);

    select.append(appInfoButton());

    headingCookieIcon();

    // initialise with the select element
    return select;
};

const appInfoButton = () => {
    let tooltip = 'Please select an option from the dropdown to create a cookie section. The section will ' +
        'allow you to define groups of cookies.';

    return Button('app-info', Icon.info(), null, tooltip);
};

function inputFocus (event) {
    let group = $(this).closest('.ccfw-group');
    if (event.type === 'focusin') {
        group.removeClass('ccfw-group__active-opacity');
    } else {
        group.addClass('ccfw-group__active-opacity');
    }
}

// create a new top level category i.e.
const SectionSelect = (options) => {
    let defaultOptions = [
        'Analytics',
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
    // confirm with a warning if the section lock is on
    let confirmed = true;
    if (CCFW.sectionsLock) {
        // is debug on?
        let checkbox = jQuery('#' + CCFW.debug.checkbox);
        let isChecked = checkbox.is(':checked');
        let message = 'If you continue the current available data will be overwritten.\n\n' +
            'Would you like to proceed?\n\n' +
            'Click Cancel to review your data, or OK to erase and start again.'

        confirmed = window.confirm(message);

        if (confirmed) {
            CCFW.sections = {};
            CCFW.sectionsLock = false;
        } else if (!isChecked) {
            checkbox.click();
        }
    }

    if (confirmed) {
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
        listener.group.save(section, saveGroup);
        $('#ccfw-' + section + '-section-remove').on('click', deleteSection);

        select.find('option[value=' + section + ']').remove();
        hideShowSectionSelect();
    }
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
    let descriptionContainer = '';

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

    // create description elements and drop in the end of groups
    descriptionContainer = element('div', {'class': 'ccfw-group__description'});
    descriptionContainer.append(Input('ccfw-group-description', 'Enter ' + name + ' group blurb'));
    descriptionContainer.append(Button('ccfw-cookie-row-add', Icon.add(20), 'Add cookie'));
    group.append(descriptionContainer);

    // drop first cookie row
    let cookies = Cookies();
    group.append(cookies.container);
    App.cookies.add(sectionName, name, 'row_0');

    // focus on name for simplicity
    cookies.row.find('input[name="name"]').focus();

    // move input and header below the row
    section.append(Group(sectionName));

    // listeners
    listener.group.save(sectionName, saveGroup);
    listener.group.allowlist(nameSlugged, saveAllowListID);
    listener.group.description.save(saveDescription);
    listener.row.add(addRow);
    listener.row.remove(removeRow);
    listener.row.save(saveCookieData);
}

function saveAllowListID () {
    let closest = locationData($(this));
    let group = $(this).closest('div.ccfw-group');
    let input = group.find('input[name=gtm-allowlist-id]');
    let allowlistID = input.val();

    App.group.allowlistID(closest.section, closest.group, allowlistID);

    group.find('.ccfw-group__heading').after(groupAllowlistConfirm(allowlistID));
    input.next('button').remove();
    input.remove();
}

function deleteSection () {
    let section = $(this).parent('div').data('id');
    let confirm = window.confirm('\nAre you sure you want to remove ' + section + ' cookies?');

    if (confirm) {
        // remove the section
        $('#ccfw-section__' + section).remove();

        App.section.remove(section);

        // add option to the select
        $('#' + CCFW.sectionId + ' select').append(Option(capitalize(section)));
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

function saveDescription () {
    let input = $(this);
    let closest = locationData(input);
    let value = input.val();

    App.group.description.save(closest.section, closest.group, value);
}

const Cookies = () => {
    let container = element('div', { 'class': 'ccfw-cookie-container' });
    let row = Row(0);

    container.append(row);

    return { container, row };
};

function addRow () {
    let container = $(this).parent().siblings('.ccfw-cookie-container');
    let count = container.find('.ccfw-cookie-row').length;
    let closest = locationData($(this));
    let validId = false;

    // manage row counts and ID's
    while (validId === false) {
        if (App.cookies.row.exists(closest.section, closest.group, 'row_' + count)) {
            count++;
        } else {
            validId = true;
            break;
        }
    }

    let row = Row(count);
    container.append(row);
    // focus on name for simplicity
    row.find('input[name="name"]').focus();

    App.cookies.add(closest.section, closest.group, 'row_' + count);
    listener.row.save(saveCookieData);
    listener.row.remove(removeRow);
}

function saveCookieData () {
    let input = $(this);
    let closest = locationData(input);
    let row = input.parent().data('id');
    let name = input.prop('name');
    let value = input.val();

    App.cookies.update(closest.section, closest.group, row, name, value);
}

function removeRow () {
    let closest = locationData($(this));
    let row = $(this).parent();
    let rowId = row.data('id');

    App.cookies.remove(closest.section, closest.group, rowId);

    row.remove();
}

const headingCookieIcon = () => {
    jQuery('h2:contains(Cookie Management Settings)').css({
        marginBottom: '1.68em'
    }).prepend(Icon.cookie(28));
};

const locationData = (ele) => {
    return {
        section: ele.closest('div.ccfw-section').data('id'),
        group: ele.closest('div.ccfw-group').data('id')
    };
};

/**
 * Intercept 'Save Changes' submit button
 * @param event
 * @return {boolean}
 */
function formSubmit (event) {
    if (CCFW.sectionsLock) {
        // nothing to do while lock is active
        return true;
    }

    // let's go!
    // release the unload barrier
    window.onbeforeunload = null;

    // grab data and send to the server, and
    // stop page warning from appearing, if success
    $('html, body').animate({ scrollTop: 30 }, 'fast');

    // processing here:
    if (App.form.post(CCFW.sections)) {
        console.log('AJAX POST done! Good things happen here.');
    }
}

const Row = (id) => {
    // markup
    let row = element('div', { 'class': 'ccfw-cookie-row' }).data('id', 'row_' + id);

    row.append(Input('name', 'Name'));
    row.append(Input('description', 'Description'));
    row.append(Input('expiry', 'Expiry or URL'));
    row.append(Button('ccfw-cookie-row-remove', Icon.crossArrow(30)));

    return row;
};

export { Init, appInfoButton, headingCookieIcon };
