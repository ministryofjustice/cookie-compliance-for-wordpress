import { CCFW } from './global';
import { Builder } from './build';
import { Helper } from './helper';

const groupSave = (section, callback) => {
    let element = jQuery('.ccfw-' + section + '-group-save');
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
    element.on('keyup', callback);
};

///////////////////////////////////////
//  D E B U G G I N G
///////////////////////////////////////
const debugToggle = () => {
    let element = jQuery('#' + CCFW.debug.checkbox);
    element.on('change', toggleDebug);
};
const debugImportObject = () => {
    let element = jQuery('.' + CCFW.debug.import.textarea);
    element.on('keypress', Helper.readonly);
    element.on('keyup', importObjectDebug);
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

const importObjectDebug = () => {
    let content = jQuery('.' + CCFW.debug.import.textarea).val();
    let json = Helper.isJson(content); // returns the object

    if (json) {
        /////////
        // could extend the check to detect if the object matches expected sections
        /////////

        CCFW.sections = json;
        Builder.load();

        CCFW.debug.output();
    }
};

///////////////////////////////////////
///////////////////////////////////////

const listener = {
    group: {
        save: (section, callback) => groupSave(section, callback),
        remove: (callback) => groupRemove(callback),
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
        import: () => debugImportObject(),
        copy: () => debugCopyObject()
    }
};

export { listener };
