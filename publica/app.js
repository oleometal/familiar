//import { aritmetica} from './modulos/data/data.js';
//import {openDb} from './guiones/base.js'

//console.log(aritmetica.sumar(3,4));

/**----------------------------------------------------------------
 *   Registering Service Worker
 */
if('serviceWorker' in navigator) {
	window.addEventListener('load',() =>{
		navigator.serviceWorker.register('./internuncio.js')
		.then(registro =>{
			console.log('[app] Internuncio esta registrado con alcance: ',registro.scope);
			reg.pushManager.getSubscription().then(function(sub) {
				if (sub === null) {
				  // Update UI to ask user to register for Push
				  console.log('Not subscribed to push service!');
				} else {
				  // We have a subscription, update the database
				  console.log('Subscription object: ', sub);
				}
			  });
		  
		})
			.catch(err =>{
				console.error('[app] Registro falló: ',err);
			});
	});
}
/**-----------------------------------------------
 * 			Notificación de Inserción
 */
/**	Pedir permiso */
Notification.requestPermission(function(status) {
    console.log('[app] Estado del Permiso de Notificaión:', status);
});
/**Mostrar una notificación */
function displayNotification() {
	if (Notification.permission == 'granted') {
	  navigator.serviceWorker.getRegistration().then(function(reg) {
		var options = {
		  body: 'Here is a notification body!',
		  icon: 'images/example.png',
		  vibrate: [100, 50, 100],
		  data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		  },
		  actions: [
			{action: 'explore', title: 'Explore this new world',
			  icon: 'images/checkmark.png'},
			{action: 'close', title: 'Close notification',
			  icon: 'images/xmark.png'},
		  ]
		};
		reg.showNotification('Hello world!', options);
	  });
	}
  }
/**subscribir usuario */
function subscribeUser() {
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.ready.then(function(reg) {
  
		reg.pushManager.subscribe({
		  userVisibleOnly: true
		}).then(function(sub) {
		  console.log('Endpoint URL: ', sub.endpoint);
		}).catch(function(e) {
		  if (Notification.permission === 'denied') {
			console.warn('Permission for notifications was denied');
		  } else {
			console.error('Unable to subscribe to push', e);
		  }
		});
	  })
	}
  }
  
  
/**----------------------------------------------
 * 				Fetch
 */
/**haciendo petición */
function irABuscar(params) {
	
	fetch('https://pokeapi.co/api/v2/pokemon/1')
	.then((r)=>{
		if(!r.ok){
			throw Error(r.statusText);
		}
		return r.json();
	})
	.then((r_As_Json) => {
			console.log(r_As_Json);
		})
	.catch((err) => {
			console.log('[app] Parece que hubo un problema: \n', err);
		});
}