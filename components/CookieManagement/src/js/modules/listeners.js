import { CCFW } from './global';
import { Helper } from './helper';

const groupSave = (section, callback) => {
    let element = jQuery('.ccfw-' + section + '-group-save');
    element.off('click', callback);
    element.on('click', callback);
};

const groupEdit = (callback) => {
    let element = jQuery('.ccfw-group-name-change');
    element.off('click', callback);
    element.on('click', callback);
};

const groupNameSave = (callback) => {
    let element = jQuery('.ccfw-group__name-save');
    element.off('click', callback);
    element.on('click', callback);
};

const groupRemove = (callback) => {
    let element = jQuery('.ccfw-group-remove');
    element.off('click', callback);
    element.on('click', callback);
};

const allowlistIDSave = (callback) => {
    let element = jQuery('.ccfw-cookie-row__gtm-allowlist-id');
    element.off('keyup', callback);
    element.on('keyup', callback);
};

const rowAdd = (callback) => {
    let element = jQuery('.ccfw-cookie-row-add');
    element.off('click', callback);
    element.on('click', callback);
};

const rowRemove = (callback) => {
    let element = jQuery('.ccfw-cookie-row-remove');
    element.off('click', callback);
    element.on('click', callback);
};

const rowSave = (callback) => {
    let element = jQuery('.ccfw-cookie-row input');
    element.off('keyup', callback);
    element.on('keyup', callback);
};

const descriptionSave = (callback) => {
    let element = jQuery('.ccfw-group__description input');
    element.off('keyup', callback);
    element.on('keyup', callback);
};

///////////////////////////////////////
//  D E B U G G I N G
///////////////////////////////////////
const debugToggle = () => {
    let element = jQuery('#' + CCFW.debug.checkbox);
    element.on('change', toggleDebug);
};
const debugImportObject = (callback) => {
    let element = jQuery('.' + CCFW.debug.import.textarea);
    element.on('keypress', Helper.readonly);
    element.on('keyup', callback);
};
const debugCopyObject = () => {
    let element = jQuery('#' + CCFW.debug.preContainer).find('pre');
    element.on('click', Helper.copyText);
};

function toggleDebug () {
    let checked = jQuery(this).is(':checked');
    let container = jQuery('#' + CCFW.debug.container);

    if (checked) {
        CCFW.debug.active = true;
        if (container.length === 0) {
            CCFW.debug.make();
        }
        container.fadeIn();
    } else {
        CCFW.debug.active = false;
        container.fadeOut();
    }
}

///////////////////////////////////////
///////////////////////////////////////

const listener = {
    group: {
        save: (section, callback) => groupSave(section, callback),
        edit: (callback) => groupEdit(callback),
        remove: (callback) => groupRemove(callback),
        name: {
            save: (callback) => groupNameSave(callback)
        },
        allowlist: {
            save: (callback) => allowlistIDSave(callback)
        },
        description: {
            save: (callback) => descriptionSave(callback)
        }
    },
    row: {
        add: (callback) => rowAdd(callback),
        save: (callback) => rowSave(callback),
        remove: (callback) => rowRemove(callback)
    },
    form: {
        submit: (callback) => jQuery('#ccfw-form').on('submit', callback),
        input: {
            focusBlur: (callback) => jQuery('#' + CCFW.appContainer).on('focus blur', 'input', callback)
        }
    },
    debug: {
        toggle: () => debugToggle(),
        import: (callback) => debugImportObject(callback),
        copy: () => debugCopyObject()
    },
    remove: {
        group: {
            name: {
                save: () => jQuery('.ccfw-group__name-save').off('click')
            }
        }
    }
};

export { listener };
