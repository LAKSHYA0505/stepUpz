package in.StepUPz.product.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String slug;

    @ElementCollection
    private java.util.List<String> images;

    private String brand;

    private String description;

    private Integer stock;

    private Double price;

    private Integer rating;

    private Double ratingCount;

    private Boolean isFeatured;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt= LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.createdAt = LocalDateTime.now(); // auto-update timestamp
    }
}
