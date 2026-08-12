package com.farm2market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farm2market.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
