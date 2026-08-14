package com.farm2market.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.farm2market.dto.ProductRequest;
import com.farm2market.dto.ProductResponse;
import com.farm2market.service.ProductService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

   // get all products

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {

        List<ProductResponse> products =
                productService.getAllProducts();

        return ResponseEntity.ok(products);
    }

    // get product by id

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        ProductResponse product =
                productService.getProductById(id);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(product);
    }

    // get product by farmer

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<ProductResponse>> getProductsByFarmer(
            @PathVariable Long farmerId) {

        List<ProductResponse> products =
                productService.getProductsByFarmer(farmerId);

        return ResponseEntity.ok(products);
    }

   // get product by category

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategory(
            @PathVariable Long categoryId) {

        List<ProductResponse> products =
                productService.getProductsByCategory(categoryId);

        return ResponseEntity.ok(products);
    }

    // search product

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchProducts(
            @RequestParam String keyword) {

        List<ProductResponse> products =
                productService.searchProducts(keyword);

        return ResponseEntity.ok(products);
    }

    // add product
    @PostMapping
    public ResponseEntity<?> addProduct(
            @RequestBody ProductRequest request) {

        ProductResponse product =
                productService.addProduct(request);

        if (product == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid farmer ID or category ID");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(product);
    }
    
 // update product

 @PutMapping("/{id}")
 public ResponseEntity<?> updateProduct(
         @PathVariable Long id,
         @RequestBody ProductRequest request) {

     ProductResponse product =
             productService.updateProduct(id, request);

     if (product == null) {

         return ResponseEntity
                 .badRequest()
                 .body("Product, farmer, or category not found");
     }

     return ResponseEntity.ok(product);
 }


// delete product 

 @DeleteMapping("/{id}")
 public ResponseEntity<?> deleteProduct(
         @PathVariable Long id) {

     boolean deleted =
             productService.deleteProduct(id);

     if (!deleted) {

         return ResponseEntity
                 .notFound()
                 .build();
     }

     return ResponseEntity
             .noContent()
             .build();
 }
 
// upload product images

@PostMapping("/{id}/image")
public ResponseEntity<?> uploadProductImage(
      @PathVariable Long id,
      @RequestParam("image") MultipartFile image) {

  if (image == null || image.isEmpty()) {

      return ResponseEntity
              .badRequest()
              .body("Please select an image");
  }

  try {

      ProductResponse product =
              productService.getProductById(id);

      if (product == null) {

          return ResponseEntity
                  .notFound()
                  .build();
      }

      String uploadDirectory = "uploads/products/";

      Path directory =
              Paths.get(uploadDirectory);

      if (!Files.exists(directory)) {
          Files.createDirectories(directory);
      }

      String fileName =
              System.currentTimeMillis()
              + "_"
              + image.getOriginalFilename();

      Path filePath =
              directory.resolve(fileName);

      Files.copy(
              image.getInputStream(),
              filePath,
              StandardCopyOption.REPLACE_EXISTING
      );

      // Save image path in database
      productService.updateProductImage(
              id,
              fileName
      );

      return ResponseEntity.ok(
              "Image uploaded successfully"
      );

  } catch (IOException e) {

      return ResponseEntity
              .internalServerError()
              .body("Image upload failed");
  }
}
 
 
}