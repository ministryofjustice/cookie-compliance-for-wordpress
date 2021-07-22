import { Helper } from './helper';
import { ajax } from './ajax';
import { listener } from './listeners';
import { Icon, IconsAll } from './icons';
import { element, groupHeading, groupName } from './element';
import { Button, Input, Option, Select } from './form';
import { Builder } from './build';

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
        import: {
            container: 'ccfw-import-container',
            textarea: 'ccfw-import-cookie-object'
        },
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
            let debug = element('div', { id: CCFW.debug.container });
            let icons = element('div', { 'class': CCFW.debug.container + '-icons' });
            icons.append(IconsAll(8));

            debug.append(icons);
            debug.append('<div id ="' + CCFW.debug.preContainer + '"/>');

            jQuery('#' + CCFW.appContainer).before(debug);

            CCFW.debug.output();
        },
        output: () => {
            if (!CCFW.debug.active) {
                return;
            }

            let sections = JSON.stringify(CCFW.sections, undefined, 4);

            if (sections.length < 5) {
                let imports = element('div', { id: CCFW.debug.import.container });

                imports.append('<h3>Import cookies</h3>');
                imports.append(element('textarea', {
                    'class': CCFW.debug.import.textarea
                }));

                jQuery('#' + CCFW.debug.preContainer).html(imports);

                listener.debug.import(debugImportObject);
            } else {
                let debugging = document.getElementById(CCFW.debug.preContainer);
                debugging.innerHTML = '<pre>' + sections + '</pre>';
                listener.debug.copy();
            }
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
            let allowList = (sectionName === 'marketing' ? Input('gtm-allowlist-id', 'GTM Allowlist ID') : null);
            let description = Input('ccfw-group-description', 'Enter ' + name + ' group blurb');

            if (!name) {
                console.warn('Group name was empty.');
                return;
            }

            if (!CCFW.building && App.group.exists(sectionName, nameSlugged)) {
                Helper.alert('The group "' + name + '" already exists. Please chose another name.');
                return;
            }

            // store the value
            App.group.add(sectionName, name);

            // track the group by named id
            group.data('id', nameSlugged);
            group.addClass('ccfw-group__' + nameSlugged);

            // update heading
            group.html(groupHeading(name));
            group.append(Button('ccfw-group-name-change', Icon.edit(16, 'grey'), '', 'Edit the ' + name + ' group name'));
            group.append(Button('ccfw-group-remove', Icon.bin(16, 'grey'), '', 'Remove ' + name + ' from the ' + sectionName + ' section'));
            if (allowList) {
                group.append(allowList);
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
            listener.group.edit(CCFW.manage.editGroup);
            listener.group.remove(CCFW.manage.removeGroup);
            listener.group.allowlist.save(CCFW.save.allowListId);
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
                    if (App.cookies.row.exists(closest.section, closest.group.id, 'row_' + count)) {
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

            App.cookies.add(closest.section, closest.group.id, 'row_' + count);
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
            let input = jQuery(this);
            let closest = CCFW.manage.locationData(input);

            // remove error class if present
            input.removeClass('ccfw-form-input-invalid');
            // remove warning icon
            input.next('svg.ccfw-icon__warning').remove();

            App.group.allowlistId.save(closest, input.val().replace(/(<([^>]+)>)/gi, ""));
        },
        description: function () {
            let input = jQuery(this);
            let closest = CCFW.manage.locationData(input);

            App.group.description.save(closest, input.val().replace(/(<([^>]+)>)/gi, ""));
        },
        cookieData: function () {
            let input = jQuery(this);
            let closest = CCFW.manage.locationData(input);
            let row = input.parent().data('id');
            let name = input.prop('name');

            App.cookies.update(closest.section, closest.group.id, row, name, input.val().replace(/(<([^>]+)>)/gi, ""));
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
            let confirm = Helper.confirm('\nAre you sure you want to remove ' + section + ' cookies?');

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
                group: {
                    id: ele.closest('div.ccfw-group').data('id'),
                    name: ele.closest('div.ccfw-group').find('.ccfw-group__heading span').text().trim()
                }
            };
        },
        appInfoButton: () => {
            let tooltip = 'Choose an option from the dropdown to create a cookie section. The section will ' +
                'allow you to define groups of cookies.';

            return Button('app-info', Icon.info(), null, tooltip);
        },
        editGroup: function () {
            let closest = CCFW.manage.locationData(jQuery(this));
            let group = jQuery('.ccfw-group__' + closest.group.id + ' .ccfw-group__heading')
            let edit = element('span', {'class': 'ccfw-group__name'});
            let input = element('input', {
                type: 'text',
                name: 'ccfw-group__name-input',
                value: closest.group.name,
                'class': 'ccfw-group__name-input'
            });

            // clean up IU
            jQuery(this).remove();
            group.find('> span').remove();

            edit.append(input);
            edit.append(Button('ccfw-group__name-save', Icon.check('20')));
            group.append(edit);

            listener.group.name.save(CCFW.manage.updateGroupName);
        },
        updateGroupName: function() {
            let button = jQuery(this);
            let closest = CCFW.manage.locationData(button);
            let name = button.siblings('input').val().replace(/(<([^>]+)>)/gi, "");
            let slugged = slugify(name);
            let group = button.closest('div.ccfw-group');
            let groupObj = App.group.get(closest.section, closest.group.id);
            let update = element('span');

            // change the name on the object
            groupObj.name = name;
            // run an update on the section object
            Helper.group.update(closest, slugged, groupObj);

            // remove and update if the slug has changed
            if (slugged !== closest.group.id) {
                App.group.remove(closest.section, closest.group.id);

                // update
                group.data('id', slugged)
                    .removeClass('ccfw-group__' + closest.group.id)
                    .addClass('ccfw-group__' + slugged);
            }

            // restore UI
            button.parent().remove();
            update.append(groupName(name));
            group.find('.ccfw-group__heading').append(update).after(
                Button('ccfw-group-name-change', Icon.edit(16, 'grey'), '', 'Edit the ' + name + ' group name')
            );

            // reassign the listener
            listener.group.edit(CCFW.manage.editGroup);

            // all done, update the debug panel
            CCFW.debug.output();
        },
        removeGroup: function () {
            let closest = CCFW.manage.locationData(jQuery(this));
            let confirm = Helper.confirm('\nAre you sure you want to remove the ' + closest.group.name + ' group from ' +
                closest.section + ' cookies?');

            if (confirm) {
                // remove the group
                jQuery('.ccfw-group__' + closest.group.id).remove();

                App.group.remove(closest.section, closest.group.id);
            }
        },
        removeRow: function () {
            let closest = CCFW.manage.locationData(jQuery(this));
            let row = jQuery(this).parent();
            let rowId = row.data('id');

            App.cookies.remove(closest.section, closest.group.id, rowId);

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
            return event.returnValue = 'Changes have been made to cookie content. Are you sure you want to leave?';
        },
        /**
         * Validate all GTM allowlist IDs
         * @return {boolean}
         */
        allowlistIdsValid: () => {
            let success = true;

            for (const [section, groups] of Object.entries(CCFW.sections)) {
                // only marketing cookies have IDs
                if (section === 'marketing') {
                    for (const [group, groupObject] of Object.entries(groups)) {
                        if (!validId(section, group)) {
                            let input = jQuery('#ccfw-section__' + section + ' .ccfw-group__' + group + ' .ccfw-cookie-row__gtm-allowlist-id');

                            if (input.siblings('.ccfw-icon__warning').length === 0) {
                                input.after(Icon.warning(18));
                            }

                            input.addClass('ccfw-form-input-invalid');
                            Helper.alert('The ' + groupObject.name + ' group has an invalid GTM Allowlist ID.');
                            success = false;
                        }
                    }
                }
            }

            return success;
        }
    }
};

const beforeLeave = () => {
    CCFW.sectionsChanged = true;
    addEventListener('beforeunload', CCFW.manage.beforeUnload, { capture: true });
};

const debugImportObject = () => {
    let content = jQuery('.' + CCFW.debug.import.textarea).val();
    let json = Helper.isJson(content); // returns the object

    if (json) {
        /////////
        // could extend the check to detect if the object matches expected sections
        /////////

        CCFW.sections = json;
        beforeLeave();

        Builder.load();
        CCFW.debug.output();
    }
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

const getGroup = (section, group) => CCFW.sections[section][group]

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

    // refresh the view
    CCFW.debug.output();
}

const updateGroup = (section, group, object) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();

    CCFW.sections[section][group] = object;

    // refresh the view
    CCFW.debug.output();
}

const removeGroup = (section, group) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    delete CCFW.sections[section][group];
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

const updateAllowlistId = (data, id) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    CCFW.sections[data.section][slugify(data.group.id)].allowlistID = id.trim();

    // refresh the view
    CCFW.debug.output();
};

const updateDescription = (data, text) => {
    // ignore whilst building
    if (CCFW.building) { return false; }
    beforeLeave();
    CCFW.sections[data.section][slugify(data.group.id)].description = text.trim();
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
};

const validId = (section, group) => {
    let theGroup = CCFW.sections[section][group];
    if (!theGroup.hasOwnProperty('allowlistID')) {
        return false;
    }
    return theGroup.allowlistID.length !== 0;
};

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
        get: getGroup,
        add: addGroup,
        remove: removeGroup,
        update: updateGroup,
        exists: groupExists,
        allowlistId: {
            save: updateAllowlistId
        },
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
