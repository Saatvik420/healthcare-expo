package com.example.healthcare.controller;

import com.example.healthcare.dto.AuthResponse;
import com.example.healthcare.dto.LoginRequest;
import com.example.healthcare.dto.SignupRequest;
import com.example.healthcare.model.User;
import com.example.healthcare.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();

        Optional<User> optionalUser = userRepository.findByEmailIgnoreCase(cleanEmail);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponse.builder()
                            .success(false)
                            .message("Invalid email or password. Please check your credentials.")
                            .build());
        }

        User user = optionalUser.get();
        // Support both hashed passwords and legacy plain passwords if any
        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword())
                || request.getPassword().equals(user.getPassword());

        if (!matches) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(AuthResponse.builder()
                            .success(false)
                            .message("Invalid email or password. Please check your credentials.")
                            .build());
        }

        Map<String, Object> userData = mapUserResponse(user);
        return ResponseEntity.ok(AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .user(userData)
                .build());
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailIgnoreCase(cleanEmail)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(AuthResponse.builder()
                            .success(false)
                            .message("An account with this email address already exists.")
                            .build());
        }

        User newUser = User.builder()
                .name(request.getName().trim())
                .email(cleanEmail)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null && !request.getRole().isEmpty() ? request.getRole() : "visitor")
                .phone(request.getPhone())
                .organization(request.getOrganization())
                .designation(request.getDesignation())
                .company(request.getCompany())
                .sector(request.getSector())
                .stallType(request.getStallType())
                .build();

        User savedUser = userRepository.save(newUser);
        Map<String, Object> userData = mapUserResponse(savedUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(AuthResponse.builder()
                        .success(true)
                        .message("Account created successfully")
                        .user(userData)
                        .build());
    }

    private Map<String, Object> mapUserResponse(User user) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getUid() != null ? user.getUid() : ("usr_" + user.getId()));
        map.put("name", user.getName());
        map.put("email", user.getEmail());
        map.put("role", user.getRole());
        if (user.getPhone() != null) map.put("phone", user.getPhone());
        if (user.getOrganization() != null) map.put("organization", user.getOrganization());
        if (user.getDesignation() != null) map.put("designation", user.getDesignation());
        if (user.getCompany() != null) map.put("company", user.getCompany());
        if (user.getSector() != null) map.put("sector", user.getSector());
        if (user.getStallType() != null) map.put("stallType", user.getStallType());
        if (user.getHall() != null) map.put("hall", user.getHall());
        if (user.getPassCode() != null) map.put("passCode", user.getPassCode());
        if (user.getStatus() != null) map.put("status", user.getStatus());
        if (user.getCreatedAt() != null) map.put("createdAt", user.getCreatedAt().toString());
        return map;
    }
}
