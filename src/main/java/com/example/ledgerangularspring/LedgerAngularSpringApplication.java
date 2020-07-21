package com.example.ledgerangularspring;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value = {"com.example.ledgerangularspring.mapper"})
public class LedgerAngularSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(LedgerAngularSpringApplication.class, args);
	}

}
