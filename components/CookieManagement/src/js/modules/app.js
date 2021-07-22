import { CCFW } from './global';
import { Builder } from './build';
import { listener } from './listeners';
import { Submit } from './form';

'use strict';

const Launch = () => {
    // create the UI
    Builder.init();

    // manage debugging
    CCFW.debug.init();

    // listen out for focus and blur events
    listener.form.input.focusBlur(CCFW.manage.inputFocus);
    // listen out for changes on the debug checkbox
    listener.debug.toggle();
    // listen out for submissions on the page
    listener.form.submit(Submit);

    // finally, display the app on the front end
    CCFW.create.app();
};

export { Launch };
