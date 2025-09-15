package in.StepUPz.product.service;

import in.StepUPz.product.exceptions.ResourceNotFoundException;
import in.StepUPz.product.model.Product;
import in.StepUPz.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProducts(){
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found in the database");
        }
        return products;
    }

    public Product getProduct(UUID id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found with UUID: " + id));
    }

    public Product getProductBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(UUID id, Product updatedProduct) {
        Optional<Product> existingProduct = productRepository.findById(id);

        if(existingProduct.isPresent()){
            Product product = existingProduct.get();

            product.setBrand(updatedProduct.getBrand());
            product.setDescription(updatedProduct.getDescription());
            product.setImages(updatedProduct.getImages());
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setSlug(updatedProduct.getSlug());
            product.setStock(updatedProduct.getStock());
            product.setRating(updatedProduct.getRating());
            product.setRatingCount(updatedProduct.getRatingCount());
            product.setIsFeatured(updatedProduct.getIsFeatured());

            return productRepository.save(product);
        }
        else{
            throw new ResourceNotFoundException("Product not found with UUID: " + id);
        }
    }


    public String deleteProduct(UUID id) {
        if(productRepository.findById(id).isPresent()){
            productRepository.deleteById(id);
            return "deleted";
        }
        else{
            return "product not found";
        }

    }
}
