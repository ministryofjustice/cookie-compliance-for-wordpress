const CCFW = {
    appContainer: 'ccfw-cookie-management',
    sectionId: 'ccfw-section-selects',
    sections: []
}

const addSection = (section) => {
    CCFW.sections[section] = [];
}
const addGroup = (section, groupName) => {
    CCFW.sections[section][slugify(groupName)] = {
        name: groupName
    };
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

export { CCFW, addSection, addGroup, capitalize, slugify }
