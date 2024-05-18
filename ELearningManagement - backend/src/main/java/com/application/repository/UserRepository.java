package com.application.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.application.model.User;

public interface UserRepository extends CrudRepository<User, String> {

  public User findByEmail(String email);

  public User findByUsername(String username);

  public User findByEmailAndPassword(String email, String password);

  public List<User> findProfileByEmail(String email);


  @Query("SELECT u FROM User u WHERE u.userid = ?1")
  public User findByUserId(String id);

}
