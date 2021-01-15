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
  
  
/**------------------------------------------------------------------------
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
/**------------------------------------------------------------------------
 * 	WebRTC
 */

 /*
//you can specify a STUN server here

const iceConfiguration = { }
iceConfiguration.iceServers = [];
//turn server
iceConfiguration.iceServers.push({
                urls: 'turn:my-turn-server.mycompany.com:19403',
                username: 'optional-username',
                credentials: 'auth-token'
            })
//stun  server
iceConfiguration.iceServers.push({
                urls: 'turn:stun1.l.google.com:19302' 
            })    

const localConnection = new RTCPeerConnection(iceConfiguration)


*/

const localConnection = new RTCPeerConnection()
 

localConnection.onicecandidate = e =>  {
console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
 console.log(JSON.stringify(localConnection.localDescription))
}


const sendChannel = localConnection.createDataChannel("sendChannel");
 sendChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
   sendChannel.onopen = e => console.log("open!!!!");
     sendChannel.onclose =e => console.log("closed!!!!!!");


localConnection.createOffer().then(o => localConnection.setLocalDescription(o) )
const answer = {"type":"answer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-86.0a1 8591406175436681352 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=sendrecv\r\na=fingerprint:sha-256 96:CB:B3:3A:0C:68:7B:E6:FE:80:9C:1C:E8:34:4B:8B:E2:B6:AD:A2:9F:D9:97:D5:9C:93:1B:7C:7E:95:33:B8\r\na=group:BUNDLE 0\r\na=ice-options:trickle\r\na=msid-semantic:WMS *\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:0 1 UDP 2122252543 0db219dd-401e-48c4-bdc1-1e8c166f67a7.local 57628 typ host\r\na=candidate:1 1 TCP 2105524479 0db219dd-401e-48c4-bdc1-1e8c166f67a7.local 9 typ host tcptype active\r\na=sendrecv\r\na=ice-pwd:e4a0cd7029afd64bd6bcd0f9243f170f\r\na=ice-ufrag:b4b31ddd\r\na=mid:0\r\na=setup:active\r\na=sctp-port:5000\r\na=max-message-size:1073741823\r\n"}
localConnection.setRemoteDescription(answer).then(a=>console.log("done!"))

/**peer B */
//set offer const offer = ...
 const offer = {"type":"offer","sdp":"v=0\r\no=mozilla...THIS_IS_SDPARTA-86.0a1 6133523635679856641 0 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\na=sendrecv\r\na=fingerprint:sha-256 08:98:10:32:96:51:98:57:84:F2:BD:0C:93:39:BF:92:27:67:63:6B:A1:73:7C:5A:F0:64:AA:95:F7:02:2B:0B\r\na=group:BUNDLE 0\r\na=ice-options:trickle\r\na=msid-semantic:WMS *\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:0 1 UDP 2122252543 8a79f73d-f086-405c-bf77-054aa4e1e551.local 40365 typ host\r\na=candidate:1 1 TCP 2105524479 8a79f73d-f086-405c-bf77-054aa4e1e551.local 9 typ host tcptype active\r\na=sendrecv\r\na=end-of-candidates\r\na=ice-pwd:e1ee0a8a3cccae36fc982bbb572d13b4\r\na=ice-ufrag:227a75e4\r\na=mid:0\r\na=setup:actpass\r\na=sctp-port:5000\r\na=max-message-size:1073741823\r\n"}
 const remoteConnection = new RTCPeerConnection()

remoteConnection.onicecandidate = e =>  {
console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
 console.log(JSON.stringify(remoteConnection.localDescription) )
}

 
remoteConnection.ondatachannel= e => {

      const receiveChannel = event.channel;
      receiveChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
      receiveChannel.onopen = e => console.log("open!!!!");
      receiveChannel.onclose =e => console.log("closed!!!!!!");
      remoteConnection.channel = receiveChannel;

}


remoteConnection.setRemoteDescription(offer).then(a=>console.log("done"))

//create answer
await remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(a=>
console.log(JSON.stringify(remoteConnection.localDescription)))
//send the anser to the client 