package com.farm2market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farm2market.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}