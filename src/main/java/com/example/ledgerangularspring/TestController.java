package com.example.ledgerangularspring;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = {"http://localhost:4200"}, allowedHeaders = "Access-Control-Allow-Origin")
public class TestController {

    @GetMapping("/test")
    public TestModel test(){
        System.out.println("test!!");
        return new TestModel("d1","d2");
    }
}
