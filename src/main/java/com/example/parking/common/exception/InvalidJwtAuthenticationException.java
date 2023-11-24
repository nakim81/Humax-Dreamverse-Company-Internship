package com.example.parking.common.exception;

import org.springframework.security.core.AuthenticationException;

public class InvalidJwtAuthenticationException extends AuthenticationException {
    public InvalidJwtAuthenticationException(String msg, Throwable t) {
        super(msg, t);
    }

    public InvalidJwtAuthenticationException(String msg) {
        super(msg);
    }
}
