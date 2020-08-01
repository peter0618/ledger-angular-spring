package com.example.ledgerangularspring.model.wrapper;

import lombok.Data;

@Data
public class EmptyResponseWrapper {

    public static EmptyResponseWrapper create() {
        return new EmptyResponseWrapper();
    }

    private long leadTime;

    public EmptyResponseWrapper leadTime(long leadTime) {
        this.leadTime = leadTime;
        return this;
    }

    private boolean success = true;

    public EmptyResponseWrapper success() {
        success = true;
        return this;
    }

    public EmptyResponseWrapper fail() {
        success = false;
        return this;
    }

    private String code;

    public EmptyResponseWrapper code(String code) {
        this.code = code;
        return this;
    }

    private String message;

    public EmptyResponseWrapper message(String message) {
        this.message = message;
        return this;
    }
}