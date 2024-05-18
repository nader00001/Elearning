package com.application.model;

import javax.persistence.*;

@Entity
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String groupId;
  private String message;
  private String timestamp;
  private String img;
  private String sender;
  private String senderPic;
  public Message() {

  }

  public Long getId() {
    return id;
  }

  public Message(String groupId, String message, String timestamp, String img, String sender, String senderPic) {
    this.groupId = groupId;
    this.message = message;
    this.timestamp = timestamp;
    this.img = img;
    this.sender = sender;
    this.senderPic = senderPic;
  }

  public String getGroupId() {
    return groupId;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setGroupId(String groupId) {
    this.groupId = groupId;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }

  public void setImg(String img) {
    this.img = img;
  }

  public void setSender(String sender) {
    this.sender = sender;
  }

  public void setSenderPic(String senderPic) {
    this.senderPic = senderPic;
  }

  public String getMessage() {
    return message;
  }

  public String getTimestamp() {
    return timestamp;
  }

  public String getImg() {
    return img;
  }

  public String getSender() {
    return sender;
  }

  public String getSenderPic() {
    return senderPic;
  }


}
