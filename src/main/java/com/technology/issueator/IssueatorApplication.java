package com.technology.issueator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class IssueatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(IssueatorApplication.class, args);
    }

}
