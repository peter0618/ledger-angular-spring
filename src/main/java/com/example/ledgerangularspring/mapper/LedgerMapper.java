package com.example.ledgerangularspring.mapper;

import com.example.ledgerangularspring.domain.LedgerVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LedgerMapper {

    void create(@Param("param") List<LedgerVO> param) throws Exception;

    List<LedgerVO> read(@Param("date") String date);
}
