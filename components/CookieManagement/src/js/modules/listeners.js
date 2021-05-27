import { CCFW, makeDebugContainer } from './global';

const groupSave = (section, callback) => {
    let element = jQuery('.ccfw-' + section + '-group-save');
    element.off('click', callback);
    element.on('click', callback);
};

const allowlistIDSave = (group, callback) => {
    let element = jQuery('.ccfw-' + group + '-allowlist-save');
    element.on('click', callback);
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

function toggleDebug () {
    let checked = jQuery(this).is(':checked');
    let container = jQuery('#' + CCFW.debug.container);

    if (checked) {
        CCFW.debug.active = true;
        if (container.length === 0) {
            makeDebugContainer();
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
        allowlist: (group, callback) => allowlistIDSave(group, callback),
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
    debug: () => debugToggle()
};

export { listener };
