import { CCFW } from './global';

/**
 * shall we populate the UI?
 * todo: create a module that takes existing data and rebuilds the UI
 */
const Builder = {
    init: () => {
        let interval = setInterval(() => {
            if (CCFW.sectionsLoaded) {
                clearInterval(interval);
                Builder.load();
            }
        }, 100);
    },
    load: () => {
        // first level: section
        let indent = '----> ';
        for (const [section, groups] of Object.entries(CCFW.sections)) {
            console.log(`Section: ${section}`);

            /**
             * CREATE THE SECTION
             */

            // second level: group
            for (const [group, data] of Object.entries(groups)) {
                console.log(indent + 'Group: ' + data.name);
                console.log(indent + indent + 'Description: ' + data.description);
                console.log(indent + indent + 'ID: ' + data.allowlistID);
                console.log(indent + indent + 'Cookies: ');

                /**
                 * CREATE THE GROUP
                 */

                // third level: cookie definitions
                for (const [cookie, row] of Object.entries(data.cookies)) {
                    console.log(indent + indent + indent + cookie);
                    console.log(indent + indent + indent + indent + 'Name: ' + row.name);
                    console.log(indent + indent + indent + indent + 'Description: ' + row.description);
                    console.log(indent + indent + indent + indent + 'Expiry: ' + row.expiry);

                    /**
                     * CREATE THE COOKIE ROW
                     */
                }
            }
        }
    }
};

export { Builder };
