package com.farm2market.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farm2market.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(String roleName);
}