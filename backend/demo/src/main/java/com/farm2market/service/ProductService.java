package com.farm2market.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.farm2market.dto.ProductRequest;
import com.farm2market.dto.ProductResponse;
import com.farm2market.entity.Category;
import com.farm2market.entity.Product;
import com.farm2market.entity.User;
import com.farm2market.repository.CategoryRepository;
import com.farm2market.repository.ProductRepository;
import com.farm2market.repository.UserRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

   // add product

    public ProductResponse addProduct(ProductRequest request) {

        Category category =
                categoryRepository
                        .findById(request.getCategoryId())
                        .orElse(null);

        User farmer =
                userRepository
                        .findById(request.getFarmerId())
                        .orElse(null);

        if (category == null || farmer == null) {
            return null;
        }

        Product product = new Product();

        product.setProductName(request.getProductName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setStatus(request.getStatus());

        product.setCategory(category);
        product.setFarmer(farmer);

        Product savedProduct =
                productRepository.save(product);

        return convertToResponse(savedProduct);
    }

   // get all product

    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // get product by id
    

    public ProductResponse getProductById(Long id) {

        Product product =
                productRepository
                        .findById(id)
                        .orElse(null);

        if (product == null) {
            return null;
        }

        return convertToResponse(product);
    }

  // get product by farmer

    public List<ProductResponse> getProductsByFarmer(
            Long farmerId) {

        return productRepository
                .findByFarmerUserId(farmerId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

   // get product by category

    public List<ProductResponse> getProductsByCategory(
            Long categoryId) {

        return productRepository
                .findByCategoryCategoryId(categoryId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // search product

    public List<ProductResponse> searchProducts(
            String keyword) {

        return productRepository
                .findByProductNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

   // convert entity to response

    private ProductResponse convertToResponse(
            Product product) {

        ProductResponse response =
                new ProductResponse();

        response.setProductId(
                product.getProductId());

        response.setProductName(
                product.getProductName());

        response.setDescription(
                product.getDescription());

        response.setPrice(
                product.getPrice());

        response.setQuantity(
                product.getQuantity());

        response.setImage(
                product.getImage());

        response.setStatus(
                product.getStatus());

        if (product.getCategory() != null) {

            response.setCategoryId(
                    product.getCategory()
                            .getCategoryId());

            response.setCategoryName(
                    product.getCategory()
                            .getCategoryName());
        }

        if (product.getFarmer() != null) {

            response.setFarmerId(
                    product.getFarmer()
                            .getUserId());

            response.setFarmerName(
                    product.getFarmer()
                            .getFirstName()
                    + " "
                    + product.getFarmer()
                            .getLastName());
        }

        return response;
    }
    
 // update product

 public ProductResponse updateProduct(
         Long id,
         ProductRequest request) {

     Product product =
             productRepository.findById(id).orElse(null);

     if (product == null) {
         return null;
     }

     // Update basic information
     product.setProductName(request.getProductName());
     product.setDescription(request.getDescription());
     product.setPrice(request.getPrice());
     product.setQuantity(request.getQuantity());
     product.setStatus(request.getStatus());

     // Update category
     if (request.getCategoryId() != null) {

         Category category =
                 categoryRepository
                         .findById(request.getCategoryId())
                         .orElse(null);

         if (category == null) {
             return null;
         }

         product.setCategory(category);
     }

     // Update farmer
     if (request.getFarmerId() != null) {

         User farmer =
                 userRepository
                         .findById(request.getFarmerId())
                         .orElse(null);

         if (farmer == null) {
             return null;
         }

         product.setFarmer(farmer);
     }

     Product updatedProduct =
             productRepository.save(product);

     return convertToResponse(updatedProduct);
 }


 // delete product

 public boolean deleteProduct(Long id) {

     if (!productRepository.existsById(id)) {
         return false;
     }

     productRepository.deleteById(id);

     return true;
 }
 
// update product image

public boolean updateProductImage(
      Long id,
      String imageName) {

  Product product =
          productRepository
                  .findById(id)
                  .orElse(null);

  if (product == null) {
      return false;
  }

  product.setImage(imageName);

  productRepository.save(product);

  return true;
}
 
}