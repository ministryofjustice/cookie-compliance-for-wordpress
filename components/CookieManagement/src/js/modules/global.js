import { Icon, IconsAll } from './icons';
import { ajax } from './ajax';
import { element, groupAllowlistConfirm, groupHeading } from './element';
import { listener } from './listeners';
import { Button, Input, Option, Select } from './form';

const CCFW = {
    appContainer: 'ccfw-cookie-management',
    sectionId: 'ccfw-section-select-container',
    sections: {},
    sectionsStored: false, // lets us know that sections have been saved
    sectionsLoaded: false, // locks the sections dropdown so we don't overwrite data
    sectionsChanged: false, // flags if sections data has changed in the view
    building: false, // indicate the application is building the front end
    cookieRow: {
        name: '',
        description: '',
        expiry: ''
    },
    debug: {
        container: 'debugging',
        preContainer: 'debug-settings',
        active: false,
        checkbox: 'cookie-management-debug',
        init: () => {
            jQuery.migrateMute = true;
            if (jQuery('#' + CCFW.debug.checkbox).is(':checked')) {
                CCFW.debug.active = true;
                CCFW.debug.make();
            }
        },
        make: () => {
            let debugContainer = element('div',{ id: CCFW.debug.container });
            let iconsContainer = element('div',{ 'class': CCFW.debug.container + '-icons' });
            iconsContainer.append(IconsAll(8));

            debugContainer.append(iconsContainer);
            debugContainer.append('<pre id ="' + CCFW.debug.preContainer + '"/>');

            jQuery('#' + CCFW.appContainer).before(debugContainer);

            CCFW.debug.output();
        },
        output: () => {
            if (!CCFW.debug.active) {
                return;
            }

            let debugging = document.getElementById(CCFW.debug.preContainer);
            debugging.innerHTML = JSON.stringify(CCFW.sections, undefined, 4);
        }
    },
    create: {
        app: () => {
            // initialise with the select element
            let appContainer = jQuery('#' + CCFW.appContainer);
            appContainer.html(CCFW.manage.sectionSelect().append(CCFW.manage.appInfoButton()));

            // prepend a whirligig
            appContainer.prepend('<div class="ccfw-ajax"> <div class="loader"> </div> </div>');
        },
        section: function (name) {
            let target = CCFW.building ? '#' + CCFW.sectionId + '-select' : this;
            let select = jQuery(target);
            let section = CCFW.building ? name : select.val();

            let container = element('div', {
                id: 'ccfw-section__' + section,
                'class': 'ccfw-section'
            }).data('id', section);

            let buttonRemove = element('button', {
                type: 'button',
                id: 'ccfw-' + section + '-section-remove',
                'class': 'ccfw-section-remove',
                title: 'Click to remove the ' + section + ' section and all related cookies'
            });

            // store the section
            App.section.add(section);

            buttonRemove.append(Icon.bin('20'));
            container.append(buttonRemove);
            container.append(element('h2').text(capitalize(section) + ' Cookies'));

            // Group
            let group = element('div', { 'class': 'ccfw-group' });
            let groupAction = element('div', { 'class': 'ccfw-group-define' });
            let buttonSave = element('button', {
                type: 'button',
                'class': 'ccfw-' + section + '-group-save',
                title: 'Create a group'
            });
            buttonSave.append(Icon.add(22));

            group.append(groupHeading());
            groupAction.append(Input('ccfw-group__input'));
            groupAction.append(buttonSave);

            group.append(groupAction);
            container.append(group);

            // add to the page
            jQuery('#' + CCFW.appContainer).append(container);

            if (!CCFW.building) {
                // focus on the group name input
                group.find('input[name="ccfw-group__input"]').focus();
            }

            // listeners
            listener.group.save(section, CCFW.create.group);
            jQuery('#ccfw-' + section + '-section-remove').on('click', CCFW.manage.deleteSection);

            select.find('option[value=' + section + ']').remove();
            CCFW.manage.hideShowSectionSelect();
        },
        group: function (data) {
            let target = (CCFW.building ? '.ccfw-' + data.section + '-group-save' : this);
            let section = jQuery(target).closest('div.ccfw-section');
            let group = jQuery(target).closest('div.ccfw-group');
            let name = (CCFW.building ? data.group : group.find('input').val());
            let nameSlugged = slugify(name);
            let sectionName = section.data('id');
            let descriptionContainer = '';
            let allowList = (sectionName === 'marketing' ? Input('gtm-allowlist-id', 'GTM allow list ID') : null);
            let description = Input('ccfw-group-description', 'Enter ' + name + ' group blurb');

            if (!name) {
                console.warn('Group name was empty.');
                return;
            }

            if (!CCFW.building && App.group.exists(sectionName, nameSlugged)) {
                alert('The group "' + name + '" already exists. Please chose another name.');
                return;
            }

            // store the value
            App.group.add(sectionName, name);

            // track the group by named id
            group.data('id', nameSlugged);

            // update heading
            group.html(groupHeading(name + ' ' + Icon.success(18)));
            if (allowList) {
                group.append(allowList);
                group.append(Button('ccfw-' + nameSlugged + '-allowlist-save', Icon.check(18)));
            }

            // create description elements and drop in the end of groups
            descriptionContainer = element('div', { 'class': 'ccfw-group__description' });
            descriptionContainer.append(description);
            descriptionContainer.append(Button('ccfw-cookie-row-add ccfw-cookie-row-add-' + nameSlugged, Icon.add(20), 'Add cookie'));
            group.append(descriptionContainer);

            // drop first cookie row on newly created groups
            let container = element('div', { 'class': 'ccfw-cookie-container' });
            if (!CCFW.building) {
                let cookie = CCFW.create.cookieRow(0);
                container.append(cookie);
                App.cookies.add(sectionName, name, 'row_0');

                // focus on name for simplicity
                cookie.find('input[name="name"]').focus();
            }
            group.append(container);

            // move input and header below the row
            section.append(CCFW.manage.group(sectionName));

            // listeners
            listener.group.save(sectionName, CCFW.create.group);
            listener.group.allowlist(nameSlugged, CCFW.save.allowListId);
            listener.group.description.save(CCFW.save.description);
            listener.row.add(CCFW.create.cookie);
            listener.row.remove(CCFW.manage.removeRow);
            listener.row.save(CCFW.save.cookieData);

            // update values if building
            if (CCFW.building) {
                if (allowList) {
                    allowList.val(data.id);
                }
                description.val(data.description);
            }
        },
        cookie: function (name, data) {
            let target = (CCFW.building ? '#ccfw-section__' + data.section + ' .ccfw-cookie-row-add-' + slugify(data.group) : this);
            let container = jQuery(target).parent().siblings('.ccfw-cookie-container');
            let count = CCFW.building ? name : container.find('.ccfw-cookie-row').length;
            let closest = CCFW.manage.locationData(jQuery(target));
            let validId = false;

            // manage row counts and ID's
            if (!CCFW.building) {
                while (validId === false) {
                    if (App.cookies.row.exists(closest.section, closest.group, 'row_' + count)) {
                        count++;
                    } else {
                        validId = true;
                        break;
                    }
                }
            }

            let cookie = CCFW.create.cookieRow(count);
            container.append(cookie);

            // init data if building
            if (CCFW.building) {
                cookie.find('input[name="name"]').val(data.row.name);
                cookie.find('input[name="description"]').val(data.row.description);
                cookie.find('input[name="expiry"]').val(data.row.expiry);
            } else {
                // focus on name for simplicity
                cookie.find('input[name="name"]').focus();
            }


            App.cookies.add(closest.section, closest.group, 'row_' + count);
            listener.row.save(CCFW.save.cookieData);
            listener.row.remove(CCFW.manage.removeRow);
        },
        cookieRow: (id) => {
            // markup
            let row = element('div', { 'class': 'ccfw-cookie-row' }).data('id', 'row_' + id);

            row.append(Input('name', 'Name'));
            row.append(Input('description', 'Description'));
            row.append(Input('expiry', 'Expiry or URL'));
            row.append(Button('ccfw-cookie-row-remove', Icon.crossArrow(30)));

            return row;
        }
    },
    save: {
        allowListId: function () {
            let closest = CCFW.manage.locationData(jQuery(this));
            let group = jQuery(this).closest('div.ccfw-group');
            let input = group.find('input[name=gtm-allowlist-id]');
            let allowlistID = input.val();

            App.group.allowlistID(closest.section, closest.group, allowlistID);

            group.find('.ccfw-group__heading').after(groupAllowlistConfirm(allowlistID));
            input.next('button').remove();
            input.remove();
        },
        description: function () {
            let input = jQuery(this);
            let closest = CCFW.manage.locationData(input);
            let value = input.val();

            App.group.description.save(closest.section, closest.group, value);
        },
        cookieData: function () {
            let input = jQuery(this);
            let closest = CCFW.manage.locationData(input);
            let row = input.parent().data('id');
            let name = input.prop('name');
            let value = input.val();

            App.cookies.update(closest.section, closest.group, row, name, value);
        }
    },
    manage: {
        hideShowSectionSelect: () => {
            if (jQuery('#' + CCFW.sectionId + ' option').length > 1) {
                jQuery('#' + CCFW.sectionId).show();
            } else {
                jQuery('#' + CCFW.sectionId).hide();
            }
        },
        deleteSection: function () {
            let section = jQuery(this).parent('div').data('id');
            let confirm = window.confirm('\nAre you sure you want to remove ' + section + ' cookies?');

            if (confirm) {
                // remove the section
                jQuery('#ccfw-section__' + section).remove();

                App.section.remove(section);

                // add option to the select
                jQuery('#' + CCFW.sectionId + ' select').append(Option(capitalize(section)));
                CCFW.manage.hideShowSectionSelect();
            }
        },
        inputFocus: function (event) {
            let group = jQuery(this).closest('.ccfw-group');
            if (event.type === 'focusin') {
                group.removeClass('ccfw-group__active-opacity');
            } else {
                group.addClass('ccfw-group__active-opacity');
            }
        },
        locationData: (ele) => {
            return {
                section: ele.closest('div.ccfw-section').data('id'),
                group: ele.closest('div.ccfw-group').data('id')
            };
        },
        appInfoButton: () => {
            let tooltip = 'Choose an option from the dropdown to create a cookie section. The section will ' +
                'allow you to define groups of cookies.';

            return Button('app-info', Icon.info(), null, tooltip);
        },
        removeRow: function () {
            let closest = CCFW.manage.locationData(jQuery(this));
            let row = jQuery(this).parent();
            let rowId = row.data('id');

            App.cookies.remove(closest.section, closest.group, rowId);

            row.remove();
        },
        group: (section) => {
            let group = element('div', { 'class': 'ccfw-group' });
            let groupAction = element('div', { 'class': 'ccfw-group-define' });
            let buttonSave = element('button', {
                type: 'button',
                'class': 'ccfw-' + section + '-group-save',
                title: 'Create a group'
            });
            buttonSave.append(Icon.add(22));

            group.append(groupHeading());
            groupAction.append(Input('ccfw-group__input'));
            groupAction.append(buttonSave);

            group.append(groupAction);
            return group;
        },
        sectionSelect: (options) => {
            let defaultOptions = [
                'Third-party',
                'Essential',
                'Marketing'
            ];

            if (options) {
                options.forEach((item) => {
                    defaultOptions.push(item);
                });
            }

            return Select(CCFW.sectionId, defaultOptions.reverse(), CCFW.create.section);
        },
        beforeUnload: (event) => {
            event.preventDefault();
            return event.returnValue = "Changes have been made to cookie content. Are you sure you want to leave?";
        }
    }
};

const beforeLeave = () => {
    CCFW.sectionsChanged = true;
    addEventListener("beforeunload", CCFW.manage.beforeUnload, {capture: true});
};

const addSection = (section) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    CCFW.sections[section] = {};
    beforeLeave();
    CCFW.debug.output();
};

const removeSection = (section) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    delete CCFW.sections[section];
    beforeLeave();
    CCFW.debug.output();
};

const addGroup = (section, group) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    let slug = slugify(group);
    CCFW.sections[section][slug] = {
        name: group
    };

    // init cookie row with id row_0
    CCFW.sections[section][slug].cookies = {
        row_0: {
            name: '',
            description: '',
            expiry: ''
        }
    };

    // what have we got?
    CCFW.debug.output();
};

const addGroupAllowlistID = (section, group, allowlistID) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    CCFW.sections[section][slugify(group)].allowlistID = allowlistID;

    // what have we got?
    CCFW.debug.output();
};

const addCookie = (section, group, row) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    CCFW.sections[section][slugify(group)].cookies[row] = {
        name: '',
        description: '',
        expiry: ''
    };

    CCFW.debug.output();
};

const updateCookie = (section, group, row, name, text) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    CCFW.sections[section][slugify(group)].cookies[row][name] = text.trim();
    CCFW.debug.output();
};

const updateDescription = (section, group, text) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    CCFW.sections[section][slugify(group)].description = text.trim();
    CCFW.debug.output();
};

const removeCookie = (section, group, row) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    delete CCFW.sections[section][slugify(group)].cookies[row];
    CCFW.debug.output();
};

const groupExists = (section, group) => CCFW.sections[section].hasOwnProperty(group);
const rowExists = (section, group, row) => {
    group = slugify(group);
    // it's possible to save a group without a cookie defined
    // if that happened and cookies doesn't exist, define it here.
    if (!CCFW.sections[section][group].cookies) {
        CCFW.sections[section][group].cookies = {};
    }

    return CCFW.sections[section][group].cookies.hasOwnProperty(row);
}

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const slugify = (s) => {
    return s.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[-]+/g, '-')
        .replace(/[^\w-]+/g, '');
};

const App = {
    section: {
        add: addSection,
        remove: removeSection
    },
    group: {
        add: addGroup,
        exists: groupExists,
        allowlistID: addGroupAllowlistID,
        description: {
            save: updateDescription
        }
    },
    cookies: {
        add: addCookie,
        update: updateCookie,
        remove: removeCookie,
        row: {
            exists: rowExists
        },
        get: () => ajax.get()
    },
    form: {
        post: (data) => ajax.post(data)
    }
};

export { CCFW, App };
