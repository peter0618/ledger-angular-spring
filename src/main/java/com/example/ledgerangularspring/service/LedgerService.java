package com.example.ledgerangularspring.service;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.mapper.LedgerMapper;
import com.example.ledgerangularspring.model.wrapper.EmptyResponseWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

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

        try {
            // 날짜를 mysql DB에 저장 가능하도록 변환
            for(LedgerVO ledgerVO : ledgerVOs){
//                System.out.println(ledgerVO.getStndDate());
                // TODO : UTC => YYYY-MM-DD (toMysql) 기능 Util 로 빼는 리팩토링
                SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                inputFormat.setTimeZone(TimeZone.getTimeZone("UTC")); // angular가 2020/08/10을 2020-08-09T15:00:00.000Z (한국시각 기준 00시)로 변환해서 날려줘서 UTC로 해석해야 하는듯...
                Date date = inputFormat.parse(ledgerVO.getStndDate()); // 2020-08-09T15:00:00.000Z 포맷을 파싱 => Mon Aug 10 00:00:00 KST 2020
//                System.out.println(date.toString());
                SimpleDateFormat YMDFormat = new SimpleDateFormat("yyyy-MM-dd");
                String formattedDate = YMDFormat.format(date); // 2020-08-10
                ledgerVO.setStndDate(formattedDate);
            }
            int cnt = this.ledgerMapper.insertLedger(ledgerVOs);
            System.out.println("cnt : " + cnt);

        } catch (Exception e){
            return EmptyResponseWrapper.create().fail().code("500").message(e.getMessage());
        }

        return EmptyResponseWrapper.create().leadTime(System.currentTimeMillis() - now);
    }
}

