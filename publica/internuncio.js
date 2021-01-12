

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
/**----------------------------------------------
 *      Notificaciones
 */
/**escuchando evento  */
self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
  
    console.log('Closed notification: ' + primaryKey);
  });
  /**evento click */
  self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('http://www.google.com');
      notification.close();
    }
  });
/**Manejo del evento de inserción en el trabajador de servicio */
self.addEventListener('push', function(e) {
    var options = {
      body: 'This notification was generated from a push!',
      icon: 'images/example.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      },
      actions: [
        {action: 'explore', title: 'Explore this new world',
          icon: 'images/checkmark.png'},
        {action: 'close', title: 'Close',
          icon: 'images/xmark.png'},
      ]
    };
    e.waitUntil(
      self.registration.showNotification('Hello world!', options)
    );
  });
  
  