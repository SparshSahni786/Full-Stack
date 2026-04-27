package com.example.experiment7.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<?> profile(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
            "message", "Welcome, authenticated user!",
            "username", authentication.getName(),
            "role", authentication.getAuthorities().toString()
        ));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
            "message", "User Dashboard",
            "username", authentication.getName(),
            "info", "You can access this as USER or ADMIN"
        ));
    }
}
