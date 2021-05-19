import { CCFW, makeDebugContainer } from './modules/global';
import { IconsAll } from './modules/icons';
import { Init } from './modules/markup';

jQuery(function ($) {
    let appContainer = $('#' + CCFW.appContainer);

    makeDebugContainer();

    appContainer.html(Init());

    // breath
    appContainer.append('<br><br><br>');
    // output all available icons
    appContainer.append(IconsAll);
});
