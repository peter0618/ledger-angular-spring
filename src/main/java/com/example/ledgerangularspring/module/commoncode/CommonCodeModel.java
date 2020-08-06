package com.example.ledgerangularspring.module.commoncode;

import lombok.Data;

@Data
public class CommonCodeModel {
    private int id;                // 유일식별자
    private String divCode;        // 구분코드
    private String divCodeName;    // 구분코드명
    private String dtlCode;        // 상세코드
    private String dtlCodeName;    // 상세코드명
    private String note;           // 비고
}
