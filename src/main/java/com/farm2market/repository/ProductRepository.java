package com.farm2market.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farm2market.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	 List<Product> findByFarmerUserId(Long farmerId);

	    List<Product> findByCategoryCategoryId(Long categoryId);

	    List<Product> findByProductNameContainingIgnoreCase(
	            String keyword);
}
