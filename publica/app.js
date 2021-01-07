//import { aritmetica} from './modulos/data/data.js';
//import {openDb} from './guiones/base.js'

//console.log(aritmetica.sumar(3,4));

/**----------------------------------------------------------------
 *   Registering Service Worker
 */
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./internuncio.js');
};
