// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject('ws://localhost:8080//text-ws'); // Remplacez l'URL par votre endpoint WebSocket
    this.socket$.subscribe(
      (message: any) => {
        if (typeof message === 'string') {
          console.log('Message de type string reçu du serveur:', message);
          // Logique de traitement pour les messages de type string
        } else {
          console.log('Message de type JSON reçu du serveur:', message);
          // Logique de traitement pour les messages de type JSON
        }
      },
      error => console.error('Erreur de réception du message:', error)
    );
  }

  sendMessage(message: any) {
    this.socket$.next(message);
    console.log('Message envoyé au serveur:', message);
  }
  
  getMessage() {
    return this.socket$.asObservable();
  }
}
