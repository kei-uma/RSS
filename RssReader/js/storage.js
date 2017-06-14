function saveStorage(key, data){

    var value = JSON.stringify(data);
    localStorage.setItem(key, value);
}

function loadStorage(key) {
    var value = localStorage.getItem(key);
    var data = JSON.parse(value);

    if (data == null)
        data = [];
    return data;
}
