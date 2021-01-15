/**-----------------------------------------------------------------
 * elementos del DOM
 */
const listaProductos = document.getElementById("lista-productos");

/**---------------------------------------------------------------------
 * 		Base de Datos
 ----------------------------------------------------------------------*/
const BD_NOMBRE = 'productos';
  const BD_VERSION = 2; // Use a long long for this value (don't use a float)
  const BD_NOMBRE_ALMACEN = 'bodega';
  let bd = null;
/** solicitud Apertura base de datos. */
const solicitudAperturaBase = indexedDB.open(BD_NOMBRE, BD_VERSION);
/**  crear almacen e indices */
solicitudAperturaBase.onupgradeneeded = function(evento) {
	let almacen = evento.currentTarget.result.createObjectStore(BD_NOMBRE_ALMACEN,{keyPath:'nombre',autoIncrement:false});
	//tambien se puede de esta manera
	//bd = solicitudAperturaBase.result;
	//let almacen = bd.createObjectStore('nombre', {keypath:'id'); 
		
	//const titleIndex = almacen.createIndex("by_title", "title", {unique: true});
	//const authorIndex = almacen.createIndex("by_author", "author");
  
	// Populate with initial data.
	//almacen.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
	//almacen.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
	//almacen.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
  };
  
solicitudAperturaBase.onsuccess = function (){
	bd = solicitudAperturaBase.result;
	console.log("apertura de base: "+ bd);
	leer();
  };
solicitudAperturaBase.onerror = function () {
	console.log("error: ",error);
  };
/** leer los datos de la base de datos */
function leer() {
	const solicitud = bd.transaction([BD_NOMBRE_ALMACEN])
	.objectStore(BD_NOMBRE_ALMACEN)
	.openCursor();
	
	const fragmento = document.createDocumentFragment(); 
	
	solicitud.onerror = function(event) {
	   alert("Unable to retrieve data from database!");
	};
	
	solicitud.onsuccess = function(evento) {
	   const cursor = evento.target.result
	   if(cursor) {
		   const nombreProducto = document.createElement('P');
		   nombreProducto.textContent = cursor.value.nombre
		   fragmento.appendChild(nombreProducto)
		   
		   const cantidadProducto = document.createElement('P')
		   cantidadProducto.textContent = cursor.value.cantidad
		   fragmento.appendChild(cantidadProducto)

		   const botónActualizar = document.createElement('BUTTON')
		   botónActualizar.dataset.type = 'actualizar'
		   botónActualizar.dataset.key = cursor.key
		   botónActualizar.textContent = 'Actualizar'
		   fragmento.appendChild(botónActualizar)
		   
		   const botónBorrar = document.createElement('BUTTON')
		   botónBorrar.textContent = 'Borrar'
		   botónBorrar.dataset.tipo = 'borrar'
		   botónBorrar.dataset.key = cursor.key
		   fragmento.appendChild(botónBorrar)

		   cursor.continue()
	   } else {
		   listaProductos.textContent = ''
		   listaProductos.appendChild(fragmento)
	   }
	};
 }
/** agregar datos a la base de datos */
function añadir(datos) {
	//primera forma 
	/* const transacción = bd.transaction([BD_NOMBRE_ALMACEN],"readwrite")
	const almacen = transacción.objectStore(BD_NOMBRE_ALMACEN);
	const solicitud = almacen.add(datos); */
	//segunda forma
	const solicitud = bd.transaction([BD_NOMBRE_ALMACEN],"readwrite")
	.objectStore(BD_NOMBRE_ALMACEN)
	.add(datos);
	//console.log(solicitud);
	//manejo de exito y error
	solicitud.onsuccess = function (evento) {
		console.log("se agregó correctamente el dato");
	};
	solicitud.onerror = function (evento) {
		console.log("no se agrego dato")
	};
	leer();
}
/** función para obtener base de datos por metodo get() */
function obtener(key) {
	const transacción = bd.transaction([BD_NOMBRE_ALMACEN],"readwrite")
	.objectStore(BD_NOMBRE_ALMACEN)
	.get(key);
	transacción.onsuccess = function (evento) {
		formularioProductos.nombre.value = transacción.result.nombre
		formularioProductos.cantidad.value = transacción.result.cantidad
		formularioProductos.botón.dataset.acción = 'actualizar'
		formularioProductos.botón.textContent = 'Actualizar Prod.'
	}
}
function actualizar(datos) {
	const transacción = bd.transaction([BD_NOMBRE_ALMACEN],"readwrite")
	.objectStore(BD_NOMBRE_ALMACEN)
	.put(datos);
	transacción.onsuccess = () => {
		formularioProductos.botón.dataset.acción = 'agregar'
		formularioProductos.botón.textContent = 'agregar prod.'
		leer()
	}
}
function borrar(key) {
	if(confirm("¿Borrar Producto?")) {
	const transacción = bd.transaction([BD_NOMBRE_ALMACEN],"readwrite")
	.objectStore(BD_NOMBRE_ALMACEN)
	.delete(key);
	transacción.onsuccess = () =>{
		leer()
	}
}
}
/**--------------------------------------------------------------------------------
 * captura de datos del formulario de productos
 ----------------------------------------------------------------------------------*/
const formularioProductos = document.getElementById('formulario-producto');
formularioProductos.addEventListener('submit',(evento) => {
	evento.preventDefault()
	const datos = {
		nombre: evento.target.nombre.value,
		cantidad:evento.target.cantidad.value
	}
	if(evento.target.botón.dataset.acción == 'agregar'){
		añadir(datos);
	}else if(evento.target.botón.dataset.acción == 'actualizar'){
		actualizar(datos)
	}
formularioProductos.reset()

});
listaProductos.addEventListener('click',(evento) => {
	if(evento.target.dataset.type == 'actualizar'){
		obtener(evento.target.dataset.key)
	} else if( evento.target.dataset.tipo == 'borrar'){
		borrar(evento.target.dataset.key)
	}
})
export * from './baseDeDatos.js';
