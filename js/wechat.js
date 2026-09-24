(function() {
    var button = document.getElementById('copy-wechat');
    var status = document.getElementById('wechat-copy-status');
    var resetTimer;
    var clearTimer;
    if (!button || !status) return;

    function showResult(copied) {
        clearTimeout(resetTimer);
        clearTimeout(clearTimer);
        status.textContent = copied ? 'Copied!' : 'Could not copy. Please select and copy the ID.';
        status.classList.add('is-visible');
        resetTimer = setTimeout(function() {
            status.classList.remove('is-visible');
            clearTimer = setTimeout(function() { status.textContent = ''; }, 200);
        }, copied ? 1500 : 4000);
    }

    function fallbackCopy(text) {
        var input = document.createElement('textarea');
        input.value = text;
        input.readOnly = true;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, text.length);
        var copied = false;
        try {
            copied = document.execCommand('copy');
        } catch (error) {
            copied = false;
        }
        document.body.removeChild(input);
        button.focus({ preventScroll: true });
        showResult(copied);
    }

    button.addEventListener('click', function() {
        var text = button.textContent.trim();
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function() {
                showResult(true);
            }, function() {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    });
})();
