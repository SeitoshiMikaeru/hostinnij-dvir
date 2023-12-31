let dbPromise = idb.open('menu-store', 1, (db) => {
    console.log(db);
    if(!db.objectStoreNames.contains('menu')){
        db.createObjectStore('menu', {keyPath: 'id'});
    }
});

function writeData(st, data) {
    return dbPromise
        .then((db) => {
            let tx = db.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.put(data);
            return tx.complete;
        });
}

function readAllData(st) {
    return dbPromise
        .then((db) => {
            let tx = db.transaction(st, 'readonly');
            let store = tx.objectStore(st);
            return store.getAll();
        })
}

function clearAllData(st) {
    return dbPromise
        .then((db) => {
            let tx = db.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.clear();
            return tx.complete;
        })
}

function deleteItem(st, id) {
    return dbPromise
        .then((db) => {
            let tx = db.transaction(st, 'readwrite');
            let store = tx.objectStore(st);
            store.delete(id);
            return tx.complete;
        })
        .then(() => {
            console.log('Item deleted!');
        })
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
}