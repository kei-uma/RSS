function download(url, onSuccess) {
    console.log("-- ダウンロード: " + url);
    $('#loading').addClass('started');
    $.ajax({
        url: getYqlRssUrl(url),
        type: 'GET',
        dataType: 'xml',

        success: function(xmlData) {
            //console.log(new XMLSerializer().serializeToString(xmlData));

            onSuccess(xmlData);
        },

        error: function() {
            console.log('-- ダウンロードを失敗しました。');
        },

        complete: function() {
            $('#loading').removeClass('started');
        }
    });
}

function getYqlRssUrl(url) {
    var yql_url = 'https://query.yahooapis.com/v1/public/yql?q=' +
        encodeURIComponent('select * from feednormalizer where url="' + url + '"') +
        '&format=xml';
    return yql_url;
}
