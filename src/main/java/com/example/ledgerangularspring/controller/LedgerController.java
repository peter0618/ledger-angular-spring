package com.example.ledgerangularspring.controller;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.service.LedgerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/monthly")
@RestController
public class LedgerController {

    private LedgerService ledgerService;

    public LedgerController(LedgerService ledgerService) {
        this.ledgerService = ledgerService;
    }

    @GetMapping("")
    private List<LedgerVO> getMonthly(){
        System.out.println("getMonthly()");
        return this.ledgerService.getMonthly();
    }

}
