/**
 * SVG Icons
 * To add a new icon, visit the URL below and search for the required visual.
 * 1. Choose SVG -> <Embed> and copy the path section, create a new property
 *    within iconSVGPaths using a common name. For instance:
 *    If we wanted to add a smiley (use alpha chars only for naming) we can:
 *       - visit the URL below
 *       - choose <embed>
 *       - copy the path, and
 *       - name an entry smiley
 * 2. Add the new smiley to the switch in the Icon function. we do this to define it's default state.
 * 3. Create a helper for the new smiley icon in the Helper object
 *
 * Nb. Icons must be registered in this module. If a new icon is omitted from the switch statement in
 * the Icon function, Icon will return an error string.
 *
 * @return string if the icon exists, an SVG in the form of HTML will be returned, error otherwise.
 * @example https://iconmonstr.com/smiley-thin-svg/
 * @example https://iconmonstr.com/
 * @author Damien Wilson - Ministry of Justice D&T, Justice on the Web Content
 */

const iconSVGPaths = {
    add: '<path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>',
    success: '<path d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z"/>',
    check: '<path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/>',
    cross: '<path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>',
    crossArrow: '<path d="M7 5h17v16h-17l-7-7.972 7-8.028zm7 6.586l-2.586-2.586-1.414 1.414 2.586 2.586-2.586 2.586 1.414 1.414 2.586-2.586 2.586 2.586 1.414-1.414-2.586-2.586 2.586-2.586-1.414-1.414-2.586 2.586z"/>',
    error: '<path d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-8.482 16.992l3.518-3.568 3.554 3.521 1.431-1.43-3.566-3.523 3.535-3.568-1.431-1.432-3.539 3.583-3.581-3.457-1.418 1.418 3.585 3.473-3.507 3.566 1.419 1.417z"/>',
    edit: '<path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/>',
    warning: '<path d="M12 0l-12 12 12 12 12-12-12-12zm-1 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>',
    info: '<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z"/>',
    bin: '<path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/>',
    save: '<path d="M13 3h2.996v5h-2.996v-5zm11 1v20h-24v-24h20l4 4zm-17 5h10v-7h-10v7zm15-4.171l-2.828-2.829h-.172v9h-14v-9h-3v20h20v-17.171zm-3 10.171h-14v1h14v-1zm0 2h-14v1h14v-1zm0 2h-14v1h14v-1z"/>',
    cookie: '<path d="M23.999 12.149c-.049 3.834-1.893 7.223-4.706 9.378-1.993 1.53-4.485 2.449-7.198 2.473-6.464.057-12.051-5.107-12.095-12 3.966 1.066 7.682-1.993 6-6 4.668.655 6.859-2.389 6.077-6 6.724.064 11.999 5.542 11.922 12.149zm-15.576-4.123c-.065 3.393-2.801 5.868-6.182 6.166 1.008 4.489 5.015 7.807 9.759 7.807 5.262 0 9.576-4.072 9.97-9.229.369-4.818-2.755-9.357-7.796-10.534-.277 2.908-2.381 5.357-5.751 5.79zm5.077 8.974c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-5.5-2.853c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm10-2.147c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm-5 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm2.5-5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-12.5 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-1.5-4c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm6-2c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-3.5-1c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/>'
};

/**
 * Helper object
 * Allows for simple, multiple use
 */
const Icon = {
    add: (size, colour) => icon('add', size, colour),
    check: (size, colour) => icon('check', size, colour),
    success: (size, colour) => icon('success', size, colour),
    cross: (size, colour) => icon('cross', size, colour),
    crossArrow: (size, colour) => icon('crossArrow', size, colour),
    error: (size, colour) => icon('error', size, colour),
    edit: (size, colour) => icon('edit', size, colour),
    warning: (size, colour) => icon('warning', size, colour),
    info: (size, colour) => icon('info', size, colour),
    bin: (size, colour) => icon('bin', size, colour),
    save: (size, colour) => icon('save', size, colour),
    cookie: (size, colour) => icon('cookie', size, colour)
};

const icon = (type, size, colour) => {
    // default size if not defined
    size = size || 24;

    // default colours...
    switch (type) {
        // GREEN
        case 'add':
        case 'check':
        case 'success':
            colour = colour || '#149414';
            break;
        // RED
        case 'cross':
        case 'crossArrow':
        case 'error':
        case 'bin':
            colour = colour || '#CC0000';
            break;
        // ORANGE
        case 'edit':
        case 'warning':
            colour = colour || '#FFA500';
            break;
        // BLUE
        case 'info':
        case 'save':
            colour = colour || '#195e9f';
            break;
        // BROWN
        case 'cookie':
            colour = colour || '#984e0a';
            break;
        default:
            return '<b style="color:darkred">Error:</b> <b>Icon not found for <em>' + type + '</em></b>';
    }

    return '<svg ' +
        'xmlns="http://www.w3.org/2000/svg" ' +
        'class="ccfw-icon ccfw-icon__' + type + '" ' +
        'width="' + size + '" ' +
        'height="' + size + '" ' +
        'fill="' + colour + '" ' +
        'viewBox="0 0 24 24">' + iconSVGPaths[type] + ' ' +
        '</svg>';
}

/**
 * Display a list of available Icons
 *
 * Uses a multiple operator to display a set number of icons per row
 * @return {string}
 * @constructor
 */
const IconsAll = (iconsPerLine) => {
    let html = '<h3>Available icons</h3>';
    iconsPerLine = iconsPerLine || 8;
    Object.entries(Icon).forEach((item, index) => {
        html += item[1]() + ((index + 1) % iconsPerLine === 0 ? '<br><br>' : ' &nbsp; ')
    })

    return html;
};

export { Icon, IconsAll };
