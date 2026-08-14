package com.farm2market.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.farm2market.entity.Category;
import com.farm2market.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get category by ID
    public Category getCategoryById(Long id) {

        return categoryRepository
                .findById(id)
                .orElse(null);
    }

    // Add category
    public Category addCategory(Category category) {

        return categoryRepository.save(category);
    }

    // Delete category
    public boolean deleteCategory(Long id) {

        if (!categoryRepository.existsById(id)) {
            return false;
        }

        categoryRepository.deleteById(id);

        return true;
    }
}