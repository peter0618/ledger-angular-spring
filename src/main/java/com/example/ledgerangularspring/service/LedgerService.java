package com.example.ledgerangularspring.service;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.mapper.LedgerMapper;
import com.example.ledgerangularspring.model.wrapper.EmptyResponseWrapper;
import com.example.ledgerangularspring.model.wrapper.ListResponseWrapper;
import com.example.ledgerangularspring.util.TimeUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LedgerService {

    private LedgerMapper ledgerMapper;

    private final ObjectMapper objectMapper;

    public LedgerService(LedgerMapper ledgerMapper, ObjectMapper objectMapper) {
        this.ledgerMapper = ledgerMapper;
        this.objectMapper = objectMapper;
    }

    public ListResponseWrapper getMonthly(String year, String month) {
        long now = System.currentTimeMillis();
        String date = year + "-" + month;
        try {
            List<LedgerVO> data = this.ledgerMapper.read(date);
            return ListResponseWrapper.<LedgerVO>create().data(data).leadTime(System.currentTimeMillis() - now);
        } catch (Exception e){
            return ListResponseWrapper.create().fail().code("500").message(e.getMessage());
        }
    }

    public EmptyResponseWrapper insertMonthly(List<LedgerVO> ledgerVOs) {
        long now = System.currentTimeMillis();
        try {
            for(LedgerVO ledgerVO : ledgerVOs) {
                ledgerVO.setStndDate(TimeUtil.utcToMysql(ledgerVO.getStndDate()));
            }
            int cnt = this.ledgerMapper.insertLedger(ledgerVOs);
            System.out.println("cnt : " + cnt);
            // TODO : cnt = 0 인 경우에 대한 예외처리가 필요합니다.
            return EmptyResponseWrapper.create().leadTime(System.currentTimeMillis() - now);
        } catch (Exception e){
            return EmptyResponseWrapper.create().fail().code("500").message(e.getMessage());
        }
    }
}

