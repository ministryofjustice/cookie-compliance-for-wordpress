import { IconsAll } from './icons';
import { ajax } from './ajax';

const CCFW = {
    appContainer: 'ccfw-cookie-management',
    sectionId: 'ccfw-section-select-container',
    sections: {},
    sectionsLock: false, // lock the sections dropdown so we don't overwrite data
    cookieRow: {
        name: '',
        description: '',
        expiry: ''
    },
    debug: {
        container: 'debugging',
        preContainer: 'debug-settings',
        active: false,
        checkbox: 'cookie-management-debug'
    }
}

const makeDebugContainer = () => {
    let debugContainer = jQuery('<div/>').attr({id: CCFW.debug.container});
    let iconsContainer = jQuery('<div/>').attr({'class': CCFW.debug.container + '-icons'});
    iconsContainer.append(IconsAll);

    debugContainer.append(iconsContainer);
    debugContainer.append('<pre id ="' + CCFW.debug.preContainer + '"/>');

    jQuery('#' + CCFW.appContainer).before(debugContainer);

    outputDebugInfo();
}

const outputDebugInfo = () => {
    if (!CCFW.debug.active) {
        return;
    }

    let debugging = document.getElementById(CCFW.debug.preContainer);
    debugging.innerHTML = JSON.stringify(CCFW.sections, undefined, 4);
}

const beforeLeave = () => {
    window.onbeforeunload = function() {
        return "Changes have been made to cookie content. Are you sure you want to leave?";
    };
}

const addSection = (section) => {
    CCFW.sections[section] = {};
    beforeLeave();
    outputDebugInfo();
}

const removeSection = (section) => {
    delete CCFW.sections[section];

    outputDebugInfo();
}

const addGroup = (section, group) => {
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
    outputDebugInfo();
}

const addGroupAllowlistID = (section, group, allowlistID) => {
    CCFW.sections[section][slugify(group)].allowlistID = allowlistID;

    // what have we got?
    outputDebugInfo();
}

const addCookie = (section, group, row) => {
    CCFW.sections[section][slugify(group)].cookies[row] = {
        name: '',
        description: '',
        expiry: ''
    };

    outputDebugInfo();
}

const updateCookie = (section, group, row, name, text) => {
    CCFW.sections[section][slugify(group)].cookies[row][name] = text.trim();
    outputDebugInfo();
}

const removeCookie = (section, group, row) => {
    delete CCFW.sections[section][slugify(group)].cookies[row];
    outputDebugInfo();
}

const groupExists = (section, group) => CCFW.sections[section].hasOwnProperty(group);
const rowExists = (section, group, row) => CCFW.sections[section][slugify(group)].cookies.hasOwnProperty(row);

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const slugify = (s) => {
    return s.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[-]+/g, '-')
        .replace(/[^\w-]+/g,'');
}

const App = {
    section: {
        add: addSection,
        remove: removeSection
    },
    group: {
        add: addGroup,
        exists: groupExists,
        allowlistID: addGroupAllowlistID
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
}

export { CCFW, App, capitalize, slugify, makeDebugContainer, outputDebugInfo }
