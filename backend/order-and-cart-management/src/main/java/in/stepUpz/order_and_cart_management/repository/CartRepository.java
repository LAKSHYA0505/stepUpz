package in.stepUpz.order_and_cart_management.repository;

import in.stepUpz.order_and_cart_management.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart , UUID> {
    Optional<Cart> findByUserId(UUID userId); //select * from cart WHERE userId=userid


}
