//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_programador_fitness',
    urlsToCache = [
        './',
        'https://use.fontawesome.com/releases/v5.6.1/css/all.css',
        'https://www.googletagmanager.com/gtag/js?id=UA-138965648-1',
        'https://mdbootstrap.com/img/Photos/Others/background.jpg',
        'https://mdbootstrap.com/img/video/animation.mp4',
        './css/bootstrap.min.css',
        './css/style.css',
        './css/mdb.min.css',
        './css/404.css',
        './js/style.js',
        './script.js',
        './js/jquery-3.3.1.min.js',
        './js/popper.min.j',
        './js/bootstrap.min.j',
        './js/mdb.min.js',
        './img/logo_stef.png',
        './img/Alstar.webp',
        './img/DevFolio.webp',
        './img/eStartup.webp',
        './img/Freelance.webp',
        './img/Perfil.webp',
        './img/portafolio.webp',
        './img/Regna.webp',
        './img/TheEvent.webp',
    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperar del cache
                return res
            }
            //recuperar de la petición a la url
            return fetch(e.request)
        })
    )
})