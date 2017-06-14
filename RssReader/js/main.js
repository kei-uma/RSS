$(document).ready(function() {
    // var feed_url = 'http://feeds.feedburner.com/hatena/b/hotentry';

    //download(feed_url, displayFeedResults);
    //registerFavorite(feed_url);// お気に入り追加のテスト
    // regsiterBookmark(feed_url);// Bookmark確認用
    $('#add-favorite-form').on('submit', function(event) {

        event.preventDefault();
        var url = $(this).find('input[name="add-favorite-url"]').val();
        registerFavorite(url);
    });

    displayFavorites();
    displayBookmarks()

    $('#feed-filter').on('input', function() {
        var word = $(this).val();
        console.log('-- フィルター: ' + word);
    });

    $('#feed-filter').on('input', function() {
        var word = $(this).val();
        filterFeed(word);
    });

    $('.menu-btn').click(function() {
        //  console.log("クリック")
        $('#menu').toggleClass('opened');
    });

    // TODO:
    // 追加機能
    // 一覧をクリックするとメニューを閉じる
    $('#page').click(function() {
        // console.log("クリック")
        $('#menu').toggleClass('opened', false);
    });



});
