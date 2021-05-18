import { CCFW } from './modules/global';
import { Icon, IconsAll } from './modules/icons';
import { Init } from './modules/markup';

jQuery(function ($) {
    let appContainer = $('#' + CCFW.appContainer);

    appContainer.html(Init());

    // breath
    appContainer.append('<br><br><br>');
    // output all available icons
    appContainer.append(IconsAll);
});
