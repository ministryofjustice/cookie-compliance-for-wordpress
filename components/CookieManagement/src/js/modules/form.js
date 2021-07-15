import { element } from './element';
import { App, CCFW } from './global';

const Select = (name, options, callback) => {
    let select = element('select', { name: name, id: name + '-select' });
    let selectContainer = element('div', { id: name });
    select.append(Option('Create a section'));

    options.forEach((name) => {
        select.append(Option(name));
    });

    select.on('change', callback);
    selectContainer.html(select);
    return selectContainer;
};

const Option = (value) => {
    let name = value || '-- Create an item --';
    value = value || '';
    return element('option', { value: value.toLowerCase() }).text(name);
};

const Input = (name, defaultText) => {
    return element('input', {
        type: 'text',
        name: name,
        placeholder: defaultText || '',
        'class': 'ccfw-cookie-row__' + name
    });
};
const Button = (className, icon, text, title) => {
    let button = element('button', { type: 'button', 'class': className });

    if (text) {
        button.append(text);
    }

    if (title) {
        button.attr('title', title);
    }

    if (icon) {
        button.append(icon);
    }

    return button;
};

/**
 * Intercept 'Save Changes' submit button
 *
 * @param event
 * @return {boolean}
 */
function Submit (event) {
    // perform a check for valid GTM allowlist ID's
    if (!CCFW.manage.allowlistIdsValid()) {
        event.preventDefault();
        return false;
    }

    if (CCFW.sectionsChanged) {
        // release the unload barrier
        removeEventListener('beforeunload', CCFW.manage.beforeUnload, { capture: true });

        // go to the top of the page for smoothness
        jQuery('html, body').animate({ scrollTop: 30 }, 'fast');

        if (!CCFW.sectionsStored) {
            event.preventDefault();
            // send data to the server
            App.form.post(CCFW.sections);

            return false;
        }
    }
}

export { Select, Option, Input, Button, Submit };
