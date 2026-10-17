/*============= Content Protection JS ==============*/
(function () {
    // Form fields stay usable so visitors can still type and paste in the contact form
    function isEditable(el) {
        return el && el.closest && el.closest('input, textarea, select, [contenteditable="true"]');
    }

    // Disable text selection and image dragging with CSS
    var style = document.createElement('style');
    style.textContent =
        'body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }' +
        'input, textarea, select, [contenteditable="true"] { -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text; user-select: text; }' +
        'img { -webkit-user-drag: none; user-drag: none; pointer-events: auto; }';
    document.head.appendChild(style);

    // Block right-click menu (Save image as..., Copy, Inspect)
    document.addEventListener('contextmenu', function (e) {
        if (!isEditable(e.target)) e.preventDefault();
    });

    // Block dragging images to the desktop
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName === 'IMG' || !isEditable(e.target)) e.preventDefault();
    });

    // Block selecting, copying and cutting text
    ['selectstart', 'copy', 'cut'].forEach(function (type) {
        document.addEventListener(type, function (e) {
            if (!isEditable(e.target)) e.preventDefault();
        });
    });

    // Block keyboard shortcuts: Ctrl/Cmd + C, X, A, S, U, P and F12 / DevTools
    document.addEventListener('keydown', function (e) {
        var key = (e.key || '').toLowerCase();
        var mod = e.ctrlKey || e.metaKey;

        if (key === 'f12') {
            e.preventDefault();
            return;
        }
        if (mod && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
            e.preventDefault();
            return;
        }
        if (mod && ['s', 'u', 'p'].indexOf(key) !== -1) {
            e.preventDefault();
            return;
        }
        if (mod && ['c', 'x', 'a'].indexOf(key) !== -1 && !isEditable(e.target)) {
            e.preventDefault();
        }
    });
})();
