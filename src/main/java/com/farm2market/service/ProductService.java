package com.farm2market.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.farm2market.entity.Product;
import com.farm2market.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public Product updateProduct(Long productId, Product productDetails) {

        Product product = productRepository
                .findById(productId)
                .orElse(null);

        if (product == null) {
            return null;
        }

        product.setProductName(productDetails.getProductName());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());
        product.setDescription(productDetails.getDescription());
        product.setImage(productDetails.getImage());
        product.setStatus(productDetails.getStatus());
        product.setCategory(productDetails.getCategory());

        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
}