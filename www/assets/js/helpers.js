/**
 * Show alert with given text, colour is specified by type
 *
 * @params string text, type (available types: succes, danger, info, warning)
 */
function showAlert(text, type)
{
    $('#alerts').hide().prepend(
        '<div class="alert alert-' + type + '" role="alert"' +
        ' style="position: absolute; top: 52px; width: 100%; z-index: 5; border-radius: 0;"' +
        '><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>' +
        '</button>' + text + '</div>'
    ).fadeIn();
    $('.alert').delay(4000).fadeOut('slow', function() {
        // Remove alert after fadeOut
        $(this).remove();
    });
}

/**
 * Initial load of all global bookmarks
 */
function initializeBookmarks()
{
    hoodie.global.findAll('bookmark').done(function(allBookmarks) {
        if (allBookmarks.length == 0) {
            // show empty message
            bookmarks.paint();
        } else {
            $.each(allBookmarks, function(i, bookmark) {
                bookmarks.add(bookmark);
            });
        }
    });
}

/**
 * Reset filter and settings on sign out
 */
function resetFilter()
{
    $('#bookmarkSearchKeywords').val('');
    $('#sortDirection option[value="desc"]').prop('selected', true);

    $('#settingsModal #settingsEmail').val('');
    $('#settingsModal #settingsNotification').prop('checked', false);
}

/**
 * Is called when user signs in
 */
function signIn()
{
    $('body').removeClass('not-logged-in').addClass('logged-in');

    initializeBookmarks();

    hoodie.account.on('signout', signOut);
    hoodie.global.on('bookmark:add', bookmarks.add);
    hoodie.global.on('bookmark:update', bookmarks.update);
    hoodie.global.on('bookmark:remove', bookmarks.remove);
}

/**
 * Is called when user signs out
 */
function signOut()
{
    resetFilter();
    bookmarks.clear();

    $('#bookmarkWrapper').html('');
    $('body').removeClass('logged-in').addClass('not-logged-in');

    hoodie.account.on('signin', signIn);
}
