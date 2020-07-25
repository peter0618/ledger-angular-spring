package com.example.ledgerangularspring.domain;

import lombok.Data;

import java.util.Date;

@Data
public class LedgerVO {
    private int id;
    private Date stndDate;
    private String itemCode;
    private String itemName;
    private String note;
    private int income;
    private int expenditure;
    private int balance;
}
