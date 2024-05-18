package com.application;

import  org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class ELearningManagementApplication {
  @Value("${server.port}")
  private    int  port  ;
  private final Logger logger= LoggerFactory.getLogger(ELearningManagementApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ELearningManagementApplication.class, args);
	}

  @PostConstruct()
    public  void  postConstruct(){
    logger.info("med elearning app server is running on port "+port );

  }

}
