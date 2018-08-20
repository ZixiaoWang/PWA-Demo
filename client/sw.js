const CACHE_VERSION = '1.0.1';
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
            console.log('Service Worker has been installed', self.registration);
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

            event.waitUntil(
                caches.keys()
                    .then(keys => {
                        return Promise.all(
                            keys.map(key => {
                                if(key !== CACHE_NAME) {
                                    return caches.delete(key);
                                } else {
                                    return Promise.resolve();
                                }
                            })
                        ).catch((err) => {
                            console.warn(err);
                            return Promise.resolve();
                        })
                    })
            );
        }
    );

self
    .addEventListener(
        'fetch',
        (event) => {
            event.respondWith(
                caches.match(event.request)
                    .then(response => {
                        if(navigator.online || !response) { return fetch(event.request); }
                        else {
                            return response;
                        }
                    })
            );
        }
    );

self
    .addEventListener(
        'push',
        (event) => {
            console.log('Service Worker has recieved PushEvent', event);
            event.waitUntil(
                self.registration
                    .showNotification(
                        'One small step for man, one gaint leap for mankind',
                        {
                            body: "This is a historical moment",
                            icon: "https://placekitten.com/35/35"
                        }
                    )
            )
        }
    )