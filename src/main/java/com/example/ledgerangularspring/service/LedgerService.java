package com.example.ledgerangularspring.service;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.mapper.LedgerMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LedgerService {

    private LedgerMapper ledgerMapper;

    public LedgerService(LedgerMapper ledgerMapper) {
        this.ledgerMapper = ledgerMapper;
    }

    public List<LedgerVO> getMonthly(String year, String month) {
        String date = year + "-" + month;
        return this.ledgerMapper.read(date);
    }
}

