package com.application.services;

import com.application.model.Message;
import com.application.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MessageService {
  @Autowired
  private MessageRepository messageRepository;

  public void saveMessage(Message message) {
    messageRepository.save(message);
  }

  public List<Message> getMessagesByGroupId(String groupId) {
    return messageRepository.findByGroupIdOrderByTimestampAsc(groupId);
  }
}
