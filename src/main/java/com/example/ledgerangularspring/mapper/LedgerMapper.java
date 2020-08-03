package com.example.ledgerangularspring.mapper;

import com.example.ledgerangularspring.domain.LedgerVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface LedgerMapper {

    void create(@Param("param") List<LedgerVO> param) throws Exception;

    List<LedgerVO> read(@Param("date") String date);

    int insertLedger(@Param("param") Map<String, String> param);
}
