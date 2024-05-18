package com.application.WebSocket;


import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyWebSocketHandler extends TextWebSocketHandler {

  private static final Logger logger = LoggerFactory.getLogger(MyWebSocketHandler.class);


  // Define a thread-safe collection to store connected sessions
  private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    logger.info("Nouvelle connexion WebSocket établie: {}", session.getId());
    sessions.add(session); // Add the new session to the collection
  }

  @Override
  public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
    logger.info("Message recu du client {} : {}", session.getId(), message.getPayload());

    // Extract and process the message based on its format
    session.sendMessage(message);
    for (WebSocketSession otherSession : sessions) {
      if (!session.equals(otherSession)) {
        otherSession.sendMessage(message);
      }
    }
  }



  @Override
  public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
    logger.error("Erreur de transport WebSocket pour la session {}", session.getId(), exception);
    sessions.remove(session); // Remove the session in case of errors
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
    logger.info("Connexion WebSocket fermée: {}", session.getId());
    sessions.remove(session); // Remove the session when it closes
  }
}
