const Helper = {
    /**
     * Add as a callback to a keypress listener to make input and textarea fields readonly
     * @param evt
     */
    readonly: (evt) => {
        let clipboardKeys = {
            winInsert : 45,
            winDelete : 46,
            SelectAll : 97,
            macCopy : 99,
            macPaste : 118,
            macCut : 120,
            redo : 121,
            undo : 122
        }
        // Simulate readonly but allow all clipboard, undo and redo action keys
        let charCode = evt.which;
        // Accept ctrl+v, ctrl+c, ctrl+z, ctrl+insert, shift+insert, shift+del and ctrl+a
        if (
            evt.ctrlKey && charCode == clipboardKeys.redo ||		/* ctrl+y redo			*/
            evt.ctrlKey && charCode == clipboardKeys.undo ||		/* ctrl+z undo			*/
            evt.ctrlKey && charCode == clipboardKeys.macCut ||		/* ctrl+x mac cut		*/
            evt.ctrlKey && charCode == clipboardKeys.macPaste ||		/* ctrl+v mac paste		*/
            evt.ctrlKey && charCode == clipboardKeys.macCopy ||		/* ctrl+c mac copy		*/
            evt.shiftKey && evt.keyCode == clipboardKeys.winInsert ||	/* shift+ins windows paste	*/
            evt.shiftKey && evt.keyCode == clipboardKeys.winDelete ||	/* shift+del windows cut	*/
            evt.ctrlKey && evt.keyCode == clipboardKeys.winInsert  ||	/* ctrl+ins windows copy	*/
            evt.ctrlKey && charCode == clipboardKeys.SelectAll		/* ctrl+a select all		*/
        ){ return 0; }
        // Shun all remaining keys simulating readonly textarea
        let theEvent = evt || window.event;
        let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        let regex = /[]|\./;
        if(!regex.test(key)) {
            theEvent.returnValue = false;
            theEvent.preventDefault();
        }
    },
    /**
     * Determines if a string is JSON. Used to prevent JS parse errors occurring.
     * @param str
     * @return {any}
     */
    isJson: (str) => {
        try {
            return JSON.parse(str);
        } catch (err) {
            // return [err];
        }
    },
    /**
     * Copy the inner text of an element
     */
    copyText: function () {
        let pre = jQuery(this);
        let content = pre.text();
        let input = jQuery('<input>');

        jQuery('body').append(input);
        input.val(content).select();
        document.execCommand('copy');
        input.remove();
        pre.addClass('copied');
        setTimeout(() => pre.removeClass('copied'), 500);
    },
    /**
     * Wrapper for window.alert
     * Used to control the alert output method for the application.
     * @param message
     */
    alert: (message) => {
        alert(message);
    },
    /**
     * Wrapper for window.confirm
     * Used to control the confirmation output method for the application.
     * @param message
     * @return {boolean}
     */
    confirm: (message) => {
        return window.confirm(message);
    }
};

export { Helper };
