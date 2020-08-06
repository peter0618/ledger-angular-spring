package com.example.ledgerangularspring.mapper;

import com.example.ledgerangularspring.module.commoncode.CommonCodeModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommonCodeMapper {

    List<CommonCodeModel> selectCommonCodes(@Param("divCode") String divCode);
}
