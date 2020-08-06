package com.example.ledgerangularspring.module.commoncode;

import com.example.ledgerangularspring.mapper.CommonCodeMapper;
import com.example.ledgerangularspring.model.wrapper.ListResponseWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommonCodeService {

    private CommonCodeMapper commonCodeMapper;

    private final ObjectMapper objectMapper;

    public CommonCodeService(CommonCodeMapper commonCodeMapper, ObjectMapper objectMapper) {
        this.commonCodeMapper = commonCodeMapper;
        this.objectMapper = objectMapper;
    }

    /**
     * 구분코드(divCode)에 해당하는 공통코드 목록을 조회합니다.
     * @param divCode
     * @return
     */
    public ListResponseWrapper selectCommonCodes(String divCode) {
        long now = System.currentTimeMillis();
        try {
            List<CommonCodeModel> commonCodes = this.commonCodeMapper.selectCommonCodes(divCode);
            return ListResponseWrapper.<CommonCodeModel>create()
                                      .code("200")
                                      .data(commonCodes)
                                      .leadTime(System.currentTimeMillis() - now);
        } catch (Exception e){
            System.out.println(e.toString());
            return ListResponseWrapper.create().fail().code("500").message(e.getMessage());
        }
    }
}
