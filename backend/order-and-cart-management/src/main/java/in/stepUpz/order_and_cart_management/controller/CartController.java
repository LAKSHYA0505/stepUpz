package in.stepUpz.order_and_cart_management.controller;

import in.stepUpz.order_and_cart_management.dto.AddToCartRequest;
import in.stepUpz.order_and_cart_management.dto.AddToCartResponse;
import in.stepUpz.order_and_cart_management.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<AddToCartResponse> addItemToCart(@RequestHeader("X-USER-ID") UUID userId, @RequestBody AddToCartRequest request){
        return ResponseEntity.ok(cartService.addToCart(userId,request));
    }
}
