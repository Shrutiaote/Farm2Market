package com.farm2market.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.farm2market.dto.LoginRequest;
import com.farm2market.dto.RegisterRequest;
import com.farm2market.entity.Role;
import com.farm2market.entity.User;
import com.farm2market.service.RoleService;
import com.farm2market.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final RoleService roleService;

    public AuthController(
            UserService userService,
            RoleService roleService) {

        this.userService = userService;
        this.roleService = roleService;
    }

    // register

    @PostMapping("/register")
    public ResponseEntity<?> register(
    		@Valid @RequestBody RegisterRequest request) {

        // Check whether email already exists
        if (userService.emailExists(request.getEmail())) {

            Map<String, String> response = new HashMap<>();

            response.put(
                    "message",
                    "Email already registered"
            );

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(response);
        }

        // Check role
        if (request.getRole() == null ||
            request.getRole().trim().isEmpty()) {

            Map<String, String> response = new HashMap<>();

            response.put(
                    "message",
                    "Role is required"
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        String roleName =
                request.getRole().trim().toUpperCase();

        Role role =
                roleService.getRoleByName(roleName);

        if (role == null) {

            Map<String, String> response = new HashMap<>();

            response.put(
                    "message",
                    "Invalid role"
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        // Create User entity
        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setRole(role);

        // Save user
        User savedUser =
                userService.registerUser(user);

        // Don't send password back
        savedUser.setPassword(null);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser);
    }


    // login

    @PostMapping("/login")
    public ResponseEntity<?> login(
    		@Valid @RequestBody LoginRequest request) {

        User user =
                userService.loginUser(
                        request.getEmail(),
                        request.getPassword()
                );

        if (user == null) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Invalid email or password"
            );

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Login successful"
        );

        response.put(
                "userId",
                user.getUserId()
        );

        response.put(
                "email",
                user.getEmail()
        );

        response.put(
                "role",
                user.getRole().getRoleName()
        );

        return ResponseEntity.ok(response);
    }
}