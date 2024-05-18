package com.application.repository;

import com.application.model.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository  extends CrudRepository<Message, Long> {
  List<Message> findByGroupIdOrderByTimestampAsc(String groupId);
}
