package com.example.ledgerangularspring.domain;

import lombok.Data;

@Data
public class LedgerVO {
    private int id;
    private int sequence;
    private String stndDate;
    private String itemCode;
    private String itemName;
    private String note;
    private int income;
    private int expenditure;
    private int balance;
}
