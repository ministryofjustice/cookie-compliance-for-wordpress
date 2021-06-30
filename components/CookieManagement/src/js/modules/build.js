import { App, CCFW } from './global';

const Builder = {
    init: () => {
        // get pre-saved app cookies
        App.cookies.get();

        // wait for the cookies to arrive
        let interval = setInterval(() => {
            if (CCFW.sectionsLoaded) {
                clearInterval(interval);
                Builder.load();
            }
        }, 100);
    },
    load: () => {
        CCFW.building = true;

        // first: sections
        for (const [section, groups] of Object.entries(CCFW.sections)) {
            // CREATE A SECTION
            CCFW.create.section(section);

            if (!groups) {
                continue;
            }

            // second: groups
            for (const [slug, group] of Object.entries(groups)) {
                // CREATE A GROUP
                CCFW.create.group({
                    section: section,
                    group: group.name,
                    description: group.description,
                    id: group.allowlistID,
                });

                if (!group.cookies) {
                    continue;
                }

                // third: cookies
                for (const [cookie, row] of Object.entries(group.cookies)) {
                    // CREATE A COOKIE ROW
                    CCFW.create.cookie(cookie.replace('row_', ''), {
                        section: section,
                        group: group.name,
                        row: row
                    });
                }
            }
        }

        // app build is now complete
        CCFW.building = false;
    }
};

export { Builder };
