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
			console.log('Internuncio esta registrado con alcance: ',registro.scope);
		})
			.catch(err =>{
				console.error('Registro falló: ',err);
			});
	});
}
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