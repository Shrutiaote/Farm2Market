package com.farm2market.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.farm2market.entity.Role;
import com.farm2market.repository.RoleRepository;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role addRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    public Role getRoleByName(String roleName) {
        return roleRepository.findByRoleName(roleName).orElse(null);
    }
}