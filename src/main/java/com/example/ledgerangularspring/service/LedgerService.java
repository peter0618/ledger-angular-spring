package com.example.ledgerangularspring.service;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.mapper.LedgerMapper;
import com.example.ledgerangularspring.model.wrapper.EmptyResponseWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Service
public class LedgerService {

    private LedgerMapper ledgerMapper;

    private final ObjectMapper objectMapper;

    public LedgerService(LedgerMapper ledgerMapper, ObjectMapper objectMapper) {
        this.ledgerMapper = ledgerMapper;
        this.objectMapper = objectMapper;
    }

    public List<LedgerVO> getMonthly(String year, String month) {
        String date = year + "-" + month;
        return this.ledgerMapper.read(date);
    }

    public EmptyResponseWrapper insertMonthly(List<LedgerVO> ledgerVOs) {
        long now = System.currentTimeMillis();
        SimpleDateFormat YMDFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            // TODO : 이런식으로 말고 list 자체를 mybatis mapper 에 넘겨서 foreach 로 처리하는 방법은 적용 안되는지 점검이 필요합니다.
            for(LedgerVO ledgerVO : ledgerVOs){
                String formattedDate = YMDFormat.format(ledgerVO.getStndDate());
                Map<String, String> param = objectMapper.convertValue(ledgerVO, Map.class);
                param.put("stndDate", formattedDate); // mysql DB에 date를 저장하기 위해서 YYYY-MM-DD formatting 을 적용합니다.

                System.out.println(param);
                int cnt = this.ledgerMapper.insertLedger(param);
                System.out.println("cnt : " + cnt);
            }
        } catch (Exception e){
            return EmptyResponseWrapper.create().fail().code("500").message(e.getMessage());
        }

        return EmptyResponseWrapper.create().leadTime(System.currentTimeMillis() - now);
    }
}

