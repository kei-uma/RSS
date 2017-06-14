function addFavorite(favorite) {

    var favorites = loadStorage('favorites');
    favorites.push(favorite);
    saveStorage('favorites', favorites);
}

function registerFavorite(url) {
  var action = false;
  var favorites = loadStorage('favorites');
  $.each(favorites, function(i, favorite) {

      // urlが登録済みか調べる。
      if (url === favorite.url) {
          action = true;
          confirm("登録済みです。");
      }
  });

      if (!action) {
    download(url, function (xmlData) {


        var favorite = {
            url: url,
            title: $(xmlData).find('title:first').text(),
            link: $(xmlData).find('link:first').text(),
            description: $(xmlData).find('description:first').text()
        };
        if (favorite.title.length < 1){
          confirm("XMLデータのURLを入力してください。");
        } else {
        console.log('-- 登録: ' + favorite.url);
        console.log('title: ' + favorite.title);
        console.log('link: ' + favorite.link);
        console.log('description: ' + favorite.description);
        addFavorite(favorite);
      }
    });
  }
}

function displayFavorites() {
      $('#favorites-list').html('');

  var favorites = loadStorage('favorites');
      $.each(favorites, function(i, favorite) {

          var html = '<li>' + favorite.title +
          '<button class="download-btn" data-url="' + favorite.url + '"><i class="fa fa-rss"></i></button>' +
          '<button class="delete-favorite-btn" data-url="' +favorite.url + '"><i class="fa fa-trash-o"></i></button>' +
          '</li>';
          $('#favorites-list').append(html);
      });

          $('.download-btn').on('click', function() {
              var url =$(this).data('url');
              download(url, displayFeedResults);
               $('#menu').toggleClass('opened');
      });

      $('.delete-favorite-btn').on('click', function () {

        var url = $(this).data('url');
        deleteFavorite(url);
        displayFavorites();
        });
}

function deleteFavorite(url) {

    var favorites = loadStorage('favorites')
    favorites = favorites.filter(function (favorite) {
          return favorite.url != url
    });
    saveStorage('favorites', favorites);
}
