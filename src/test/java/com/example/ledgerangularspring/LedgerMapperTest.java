package com.example.ledgerangularspring;

import com.example.ledgerangularspring.domain.LedgerVO;
import com.example.ledgerangularspring.mapper.LedgerMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.concurrent.ExecutionException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LedgerMapperTest {

    @Autowired
    private LedgerMapper mapper;

    @Test
    public void createTest(){

        LedgerVO vo1 = new LedgerVO();

        vo1.setStndDate(new Date());
        vo1.setItemCode("00");
        vo1.setNote("비고");
        vo1.setIncome(20000);
        vo1.setBalance(378000);

        LedgerVO vo2 = new LedgerVO();

        vo2.setStndDate(new Date());
        vo2.setItemCode("01");
        vo2.setNote("비고");
        vo2.setExpenditure(34000);
        vo2.setBalance(344000);

        ArrayList<LedgerVO> list = new ArrayList<>();
        list.add(vo1);
        list.add(vo2);

        try {
            mapper.create(list);
        } catch (Exception e) {
            System.out.println(e.toString());
        }
    }

//    @Test
//    public void readTest(){
//        try{
//            mapper.read();
//        } catch (Exception e){
//            System.out.println(e.toString());
//        }
//    }
}
