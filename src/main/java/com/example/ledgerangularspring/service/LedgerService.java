package com.example.ledgerangularspring.service;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.mapper.LedgerMapper;
import com.example.ledgerangularspring.model.wrapper.EmptyResponseWrapper;
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

    public EmptyResponseWrapper insertMonthly(List<LedgerVO> ledgerVOs) {
        // TODO : data insert 로직 처리 ( insert 와 update 를 따로 구현하려 했으나, 동시에 하는 것도 괜찮아보임
        for(LedgerVO ledgerVO : ledgerVOs){
            if(ledgerVO.getId() != 0){
                System.out.println("id 있음!!");

            } else {

                System.out.println("id 없음!!");
            }
        }

        return EmptyResponseWrapper.create();
    }
}

