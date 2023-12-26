importScripts('/src/js/idb.js');
importScripts('/src/js/utility.js');

let CACHE_STATIC_NAME = 'static-v1.2';
let CACHE_DYNAMIC_NAME = 'dynamic-v1.2';
let STATIC_FILES = [
    '/',
    '/index.html',
    '/offline.html',
    '/src/js/app.js',
    '/src/js/utility.js',
    '/src/js/feed.js',
    '/src/js/idb.js',
    '/src/js/promise.js',
    '/src/js/fetch.js',
    '/src/js/material.min.js',
    '/src/css/app.css',
    '/src/css/feed.css',
    '/src/images/main-image.png',
    '/src/images/background.png',
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap',
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
];

function isInArray(string, array) {
    let cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
        console.log('matched ', string);
        cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
        cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}

    self.addEventListener('install', (event) => {
        console.log('[SW]: installing Service Worker...', event);
        event.waitUntil(
            caches.open(CACHE_STATIC_NAME)
                .then((cache) => {
                    console.log('[SW]: precaching App Shell...');
                    cache.addAll(STATIC_FILES);
                })
        );
    });

self.addEventListener('activate', (event) => {
    console.log('[SW]: activating Service Worker...', event);
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME){
                        console.log('[SW]: cache cleanup... :', key);
                        return caches.delete(key);
                    }
                }));
            })
    )
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {

    var url = 'https://hostinnijdvirmenu-default-rtdb.europe-west1.firebasedatabase.app/menu';
    if (event.request.url.indexOf(url) > -1) {
        event.respondWith(
                    fetch(event.request)
                        .then((res) => {
                            let clonedRes = res.clone();
                            clearAllData('menu')
                                .then(() => {
                                    clonedRes.json()
                                        .then((data) => {
                                            for (let key in data){
                                                writeData('menu', data[key]);
                                            }
                                        })
                                })

                            return res;
                        })
                )
        //);
    } else if (isInArray(event.request.url, STATIC_FILES)) {
        event.respondWith(
            caches.match(event.request)
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    if (response) {
                        return response;
                    } else {
                        return fetch(event.request)
                            .then(function (res) {
                                return caches.open(CACHE_DYNAMIC_NAME)
                                    .then(function (cache) {
                                        //trimCache(CACHE_DYNAMIC_NAME, 4);
                                        cache.put(event.request.url, res.clone());
                                        return res;
                                    })
                            })
                            .catch(function (err) {
                                return caches.open(CACHE_STATIC_NAME)
                                    .then(function (cache) {
                                        if (event.request.headers.get('accept').includes('text/html')) {
                                            //return cache.match('/offline.html');
                                        }
                                    });
                            });
                    }
                })
        );
    }
});