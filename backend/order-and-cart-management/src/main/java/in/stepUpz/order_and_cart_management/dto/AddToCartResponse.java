package in.stepUpz.order_and_cart_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class AddToCartResponse {
    private String message;
    private UUID cartId;
}
