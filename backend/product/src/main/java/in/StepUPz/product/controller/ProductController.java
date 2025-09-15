package in.StepUPz.product.controller;

import in.StepUPz.product.model.Product;
import in.StepUPz.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable UUID id){
        return productService.getProduct(id);
    }

    @GetMapping("/slug/{slug}")
    public Product getProductBySlug(@PathVariable String slug){
        return productService.getProductBySlug(slug);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product){
        return productService.createProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable UUID id, @RequestBody Product updatedProduct){
        return productService.updateProduct(id,updatedProduct);
    }

    @DeleteMapping("{id}")
    public String deleteProduct(@PathVariable UUID id){
        return productService.deleteProduct(id);
    }

}
