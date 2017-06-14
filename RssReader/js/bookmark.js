function addBookmark(bookmark) {

    var bookmarks = loadStorage('bookmarks');
    bookmarks.push(bookmark);
    saveStorage('bookmarks', bookmarks);
}

function registerBookmark(title, url) {

    var action = false;
    var bookmarks = loadStorage('bookmarks');
    $.each(bookmarks, function(i, bookmark) {

        // urlが登録済みか調べる。
        if (url === bookmark.url) {
            action = true;
            confirm("登録済みです。");
        }
    });

    if (!action) {
        var bookmark = {
            url: url,
            title: title
        };
        console.log('--ブックマーク登録url', url);
        console.log('title: ' + title);
        addBookmark(bookmark);
        displayBookmarks();
    }
}


function displayBookmarks() {

    $('#bookmarks-list').html('');

    var bookmarks = loadStorage('bookmarks');
    $.each(bookmarks, function(i, bookmark) {

        var html =
            '<li>' + (i + 1) + ". " +
            '<button class="delete-bookmark-btn" data-url="' + bookmark.url + '"><i class="fa fa-trash-o"></i></button>' +
            '<a  href="' + bookmark.url + '" target="_blank">' + bookmark.title + '</a>' +
            '</li>';
        $('#bookmarks-list').append(html);
    });

    $('.delete-bookmark-btn').click(function() {
        var url = $(this).data('url');
        deleteBookmark(url);
        displayBookmarks();
    });
    //ALLデリートがクリック
    $('.deleteallbookmark').on('click', function() {
        deleteAllBookmark();
        displayBookmarks();
    });
}

function deleteBookmark(url) {

    var bookmarks = loadStorage('bookmarks');
    bookmarks = bookmarks.filter(function(bookmark) {
        return bookmark.url != url;
        return false;
    });
    saveStorage('bookmarks', bookmarks);
}

function deleteAllBookmark() {

    var bookmarks = loadStorage('bookmarks');
    bookmarks = bookmarks.filter(function(bookmark) {
        return false;
    });
    saveStorage('bookmarks', bookmarks);
}
