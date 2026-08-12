package com.farm2market.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.farm2market.entity.Role;
import com.farm2market.entity.User;
import com.farm2market.service.RoleService;
import com.farm2market.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final RoleService roleService;

    public AuthController(
            UserService userService,
            RoleService roleService) {

        this.userService = userService;
        this.roleService = roleService;
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        if (userService.emailExists(user.getEmail())) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Email already registered"
            );

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(response);
        }

        if (user.getRole() == null ||
            user.getRole().getRoleName() == null) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Role is required"
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        String roleName =
                user.getRole()
                    .getRoleName()
                    .toUpperCase();

        Role role =
                roleService.getRoleByName(roleName);

        if (role == null) {

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Invalid role"
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        user.setRole(role);

        User savedUser =
                userService.registerUser(user);

        // Don't return password
        savedUser.setPassword(null);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> loginData) {

        String email =
                loginData.get("email");

        String password =
                loginData.get("password");

        User user =
                userService.loginUser(
                        email,
                        password
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