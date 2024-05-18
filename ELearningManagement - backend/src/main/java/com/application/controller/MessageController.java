package com.application.controller;

import com.application.model.Message;
import com.application.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/messages")

public class MessageController {
  @Autowired
  private MessageService messageService;

  @PostMapping
  public ResponseEntity<?> saveMessage(@RequestBody Message message) {
    messageService.saveMessage(message);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/{groupId}")
  public ResponseEntity<List<Message>> getMessagesByGroupId(@PathVariable String groupId) {
    List<Message> messages = messageService.getMessagesByGroupId(groupId);
    return ResponseEntity.ok(messages);
  }
}
