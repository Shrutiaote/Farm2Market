package com.farm2market.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.farm2market.entity.User;
import com.farm2market.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return null;
        }

        // Hash password before saving
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {
            return null;
        }

        if (passwordEncoder.matches(
                password,
                user.getPassword())) {

            return user;
        }

        return null;
    }

    public User getUserById(Long id) {
        return userRepository
                .findById(id)
                .orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElse(null);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}