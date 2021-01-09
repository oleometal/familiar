/**Evento de instalación */
self.addEventListener('install',(e)=>{
    console.log('[Nuncio] Instalando Internuncio...');
});
/** Eventode Activación */
self.addEventListener('activate',function(e){
    console.log('[Nuncio] activando Internuncio...')
});
/**saltarse la espera */
self.skipWaiting();
/**Interceptando peticiones de red */
self.addEventListener('fetch',e =>{
    console.log('[Nuncio] Obteniendo: ',e.request.url);
});
