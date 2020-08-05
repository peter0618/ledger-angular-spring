package com.example.ledgerangularspring.controller;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.model.wrapper.EmptyResponseWrapper;
import com.example.ledgerangularspring.service.LedgerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/monthly")
@RestController
public class LedgerController {

    private LedgerService ledgerService;

    public LedgerController(LedgerService ledgerService) {
        this.ledgerService = ledgerService;
    }

    // TODO : ListResponseWrapper 로 인터페이스를 리팩토링해야 합니다.
    @GetMapping("")
    private List<LedgerVO> getMonthly(@RequestParam String year, @RequestParam String month){
        System.out.println("getMonthly(" + year + ", " + month + ")");
        return this.ledgerService.getMonthly(year, month);
    }

    /**
     * ledger_master 테이블에 row 를 bulk 로 저장합니다.
     * @param ledgerVOs
     * @return
     */
    @PostMapping("")
    private EmptyResponseWrapper insertMonthly(@RequestBody List<LedgerVO> ledgerVOs){
        System.out.println("insertMonthly(ledgerVOs: " + ledgerVOs.toString() + ")");
        return this.ledgerService.insertMonthly(ledgerVOs);
    }
}
