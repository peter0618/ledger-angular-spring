package com.example.ledgerangularspring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
    @RequestMapping({"/ledger"})
    public String index() {
        return "forward:/index.html";
    }
}
