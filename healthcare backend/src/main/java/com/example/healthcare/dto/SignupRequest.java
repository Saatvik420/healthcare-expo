package com.example.healthcare.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private String role; // 'visitor', 'exhibitor'
    private String phone;
    private String organization;
    private String designation;
    private String company;
    private String sector;
    private String stallType;
}
