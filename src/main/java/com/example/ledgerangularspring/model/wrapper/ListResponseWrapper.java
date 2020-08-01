package com.example.ledgerangularspring.model.wrapper;

import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
public class ListResponseWrapper<RESPONSE> {
    public static <RESPONSE> ListResponseWrapper<RESPONSE> create() {
        return new ListResponseWrapper<>();
    }

    private long leadTime;

    public ListResponseWrapper<RESPONSE> leadTime(long leadTime) {
        this.leadTime = leadTime;
        return this;
    }

    private boolean success = true;

    public ListResponseWrapper<RESPONSE> fail() {
        success = false;
        return this;
    }

    private String code;

    public ListResponseWrapper<RESPONSE> code(String code) {
        this.code = code;
        return this;
    }

    private String message;

    public ListResponseWrapper<RESPONSE> message(String message) {
        this.message = message;
        return this;
    }

    private Collection<RESPONSE> data;

    public ListResponseWrapper<RESPONSE> data(Collection<RESPONSE> data) {
        this.data = data;
        return this;
    }

    public ListResponseWrapper<RESPONSE> data(List<RESPONSE> data) {
        this.data = data;
        return this;
    }

}
