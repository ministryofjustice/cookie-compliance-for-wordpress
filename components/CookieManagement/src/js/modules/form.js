import { element } from './element'

const Select = (name, options, callback) => {
    let select = element('select', {name: name, id: name});
    select.append(Option());

    options.forEach((name) => {
        select.append(Option(name));
    });

    select.on('change', callback);
    return select;
}

const Option = (value) => {
    let name = value || '-- create a section --';
    value = value || '';
    return element('option', {value: value.toLowerCase()}).text(name);
}

const Input = (name, defaultText) => element('input', {type: 'text', name: name, placeholder: defaultText || ''});
const Button = (className, icon) => element('button', { type: 'button', 'class': className }).append(icon);

export { Select, Option, Input, Button }