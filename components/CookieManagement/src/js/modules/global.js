const CCFW = {
    appContainer: 'ccfw-cookie-management',
    sectionId: 'ccfw-section-selects',
    sections: {}
}

const makeDebugContainer = () => {
    jQuery('#' + CCFW.appContainer).before('<pre id ="debugging"/>');
}

function outputDebugInfo(){
    let debugging = document.getElementById("debugging");
    debugging.innerHTML = JSON.stringify(CCFW.sections, undefined, 4);
}

const addSection = (section) => {
    CCFW.sections[section] = {};
    outputDebugInfo();
}

const removeSection = (section) => {
    delete CCFW.sections[section];

    outputDebugInfo();
}

const addGroup = (section, groupName) => {
    CCFW.sections[section][slugify(groupName)] = {
        name: groupName
    };

    CCFW.sections[section][slugify(groupName)].cookies = [];

    // what have we got?
    outputDebugInfo();
}

const addGroupAllowlistID = (section, groupName, allowlistID) => {
    CCFW.sections[section][slugify(groupName)].allowlistID = allowlistID;

    // what have we got?
    outputDebugInfo();
}

const addCookieRow = (section, groupName, row) => {
    CCFW.sections[section][slugify(groupName)].cookies.push(row);
}

const removeCookieRow = (section, groupName, name) => {
    let cookies = CCFW.sections[section][slugify(groupName)].cookies;
    CCFW.sections[section][slugify(groupName)].cookies = cookies.filter(function( obj ) {
        return obj.field !== name;
    });
}

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
        remove: {},
        allowlistID: addGroupAllowlistID
    },
    cookies: {
        add: addCookieRow,
        remove: removeCookieRow
    }
}

export { CCFW, App, capitalize, slugify, makeDebugContainer }
