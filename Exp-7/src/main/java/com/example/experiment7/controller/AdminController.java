package com.example.experiment7.controller;

import com.example.experiment7.entity.User;
import com.example.experiment7.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
            "message", "Welcome, Admin!",
            "username", authentication.getName(),
            "info", "This endpoint is accessible by ADMIN only"
        ));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Hide passwords in response
        return ResponseEntity.ok(users.stream().map(u -> Map.of(
            "id", u.getId(),
            "username", u.getUsername(),
            "role", u.getRole()
        )).toList());
    }
}
