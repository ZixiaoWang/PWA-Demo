const CACHE_VERSION = '1.0.0';
const CACHE_NAME = 'PWA_SITE::' + CACHE_VERSION;
const fileToBeCached = [
    '/',
    '/index.html',
    '/js/main.js'
]

self
    .addEventListener(
        'install',
        (event) => {
            console.log('Service Worker has been installed');
            event.waitUntil(
                caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        return cache.addAll(fileToBeCached);
                    })
            )
        }
    );

self
    .addEventListener(
        'activate',
        async (event) => {
            console.log('Service Worker has been activated');

            let keyList = await caches.keys();
            let updateCache = keyList.reduce(async (accumulator, key, index) => {
                await accumulator;
                if(key !== CACHE_NAME) {
                    return caches.delete(key);
                } else {
                    return Promise.resolve();
                }
            }, Promise.resolve());

            event.waitUntil(updateCache);
        }
    );

self
    .addEventListener(
        'fetch',
        async (event) => {
            let cache = await caches.open(CACHE_NAME);
            let response = cache.match(event.request) || fetch(event.request);
            event.respondWith(response);
        }
    )