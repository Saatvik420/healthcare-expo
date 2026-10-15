package com.example.healthcare.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@Builder
public class AuthResponse {
    private boolean success;
    private String message;
    private String token;
    private Map<String, Object> user;

    public AuthResponse(boolean success, String message, String token, Map<String, Object> user) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
    }
}
