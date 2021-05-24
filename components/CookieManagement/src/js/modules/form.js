import { element } from './element'

const Select = (name, options,  callback) => {
    let select = element('select', {name: name, id: name});
    let selectContainer = element('div', { id: name});
    select.append(Option('Create a section'));

    options.forEach((name) => {
        select.append(Option(name));
    });

    select.on('change', callback);
    selectContainer.html(select);
    return selectContainer;
}

const Option = (value) => {
    let name = value || '-- Create an item --';
    value = value || '';
    return element('option', {value: value.toLowerCase()}).text(name);
}

const Input = (name, defaultText) => {
    return element('input', {
        type: 'text',
        name: name,
        placeholder: defaultText || '',
        'class': 'ccfw-cookie-row__' + name
    })
}
const Button = (className, icon, text, title) => {
    let button = element('button', { type: 'button', 'class': className });

    if (text) {
        button.append(text)
    }

    if (title) {
        button.attr('title', title)
    }

    if (icon) {
        button.append(icon);
    }

    return button;
}

export { Select, Option, Input, Button }
