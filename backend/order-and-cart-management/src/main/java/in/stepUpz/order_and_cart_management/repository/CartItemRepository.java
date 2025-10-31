package in.stepUpz.order_and_cart_management.repository;

import in.stepUpz.order_and_cart_management.model.Cartitem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartItemRepository extends JpaRepository<Cartitem,UUID> {
    Optional<Cartitem>  findByCartIdAndProductId(UUID cartId, UUID productId);

}
