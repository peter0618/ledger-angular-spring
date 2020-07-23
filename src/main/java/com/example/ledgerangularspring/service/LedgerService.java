package com.example.ledgerangularspring.service;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.mapper.LedgerMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LedgerService {

    private LedgerMapper mapper;

    public LedgerService(LedgerMapper mapper) {
        this.mapper = mapper;
    }

    public List<LedgerVO> getMonthly() {
        List<LedgerVO> list = this.mapper.read();
        return list;
    }
}

