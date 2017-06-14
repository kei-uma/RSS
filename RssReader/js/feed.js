function displayFeedResults(xmlData) {

    $('#feed-articles').html('');
    var items = $(xmlData).find('item');
    items.each(function(n) {

        var title = $(this).find('title').text();
        var description = $(this).find('description').text();
        var link = $(this).find('link').text();
        // console.log('item' + n);
        // console.log(title);
        // console.log(description);
        // console.log(link);
        var action = false;
        var bookmarks = loadStorage('bookmarks');
        $.each(bookmarks, function(i, bookmark) {

            // urlが登録済みか調べる。
            if (link === bookmark.url) {
                action = true;

            }
        });
        if (action) {
            var html =
                '<dl id ="acordion" ><article class="article-paretnt">' +
                '<dt>' +
                '<h3 class="article-title">' + title + '</h3>' +
                '</dt>' +
                '<dd><p class="article-description">' + description + '</p>' +
                '<a href="' + link + '" target="_blank" class="see-article-link">もっと見る</a>' +
                '<button class="save-bookmark-btn">登録<i class="fa fa-thumbs-o-up"></i></button><i class="fa fa-heart"></i></dd>' +
                '</article></dl>';
        } else if (!action) {
            var html =
                '<dl id ="acordion" ><article class="article-paretnt">' +
                '<dt>' +
                '<h3 class="article-title">' + title + '</h3>' +
                '</dt>' +
                '<dd><p class="article-description">' + description + '</p>' +
                '<a href="' + link + '" target="_blank" class="see-article-link">もっと見る</a>' +
                '<button class="save-bookmark-btn">登録<i class="fa fa-thumbs-o-up"></i></button></dd>' +
                '</article></dl>';
        }

        $('#feed-articles').append(html);
    });

    $('.save-bookmark-btn').on('click', function() {
        var article = $(this).parent().parent();
        // console.log(article);
        var title = article.find('.article-title').text();
        var url = article.find('.see-article-link').attr('href');
        registerBookmark(title, url);
    });

    $("dt").on("click", function() {
        $(this).next().slideToggle();
    });
    $("h2").on("click", function() {
        $("dt").next().slideToggle();
    });

}

function filterFeed(word) {
    var str = word.split(" "); //空白でor検索
    var str1 = word.split(" AND ");
    var co = word.indexOf(" AND ")
    console.log(co);
    if (co === -1) {
        if (word.length >= 1) { //or検索
            console.log("OR");
            var array = [];
            $('article').each(function() {
                var jug = false; //判定用 どちらかのワードが真であればtrueとする
                for (var i = 0; i < str.length; i++) { //配列の文字列の一致を調べる。
                    var title = $(this).find('.article-title').text().toLowerCase();
                    var titleHasWord = title.indexOf(str[i].toLowerCase()) >= 0;

                    var description = $(this).find('.article-description').text().toLowerCase();
                    var descriptionHasWord = description.indexOf(str[i].toLowerCase()) >= 0;
                    if (titleHasWord || descriptionHasWord) {
                        jug = true; //一致していればjugを真
                        $(this).removeClass('hidden'); //表示
                    }
                }
                if (jug === false) { //どのワードも一致しなかったならば
                    $(this).addClass('hidden'); //記事を非表示
                }
            });
        } else {
            $('article').removeClass('hidden');
        }

    } else {
        if (word.length >= 1) { //AND検索
            console.log("AND");
            $('article').each(function() {
                var jug = []; //判定用 どちらかのワードが真であればtrueとする。
                for (var i = 0; i < str1.length; i++) { //配列の文字列の一致を調べる。
                    var title = $(this).find('.article-title').text().toLowerCase();
                    var titleHasWord = title.indexOf(str1[i].toLowerCase()) >= 0;

                    var description = $(this).find('.article-description').text().toLowerCase();
                    var descriptionHasWord = description.indexOf(str1[i].toLowerCase()) >= 0;
                    if (titleHasWord || descriptionHasWord) {
                        jug[i] = true; //一致していればjugを真
                    } else {
                        jug[i] = false;
                    }
                }
                var count = 0;
                console.log(jug.length);
                for (var i = 0; i < jug.length; i++) {
                    if (jug[i] === true) { //すべてのワードが記事に含まれている
                        count++;
                    }
                }
                if (count === jug.length) {
                    $(this).removeClass('hidden'); //表示
                } else {
                    $(this).addClass('hidden'); //非表示
                }
            });
        } else {
            $('article').removeClass('hidden');
        }
    }
}
