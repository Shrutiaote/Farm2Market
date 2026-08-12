package com.farm2market.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farm2market.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}