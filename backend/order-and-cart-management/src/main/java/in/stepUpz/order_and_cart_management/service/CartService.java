package in.stepUpz.order_and_cart_management.service;

import in.stepUpz.order_and_cart_management.dto.AddToCartRequest;
import in.stepUpz.order_and_cart_management.dto.AddToCartResponse;
import in.stepUpz.order_and_cart_management.exception.BadRequestException;
import in.stepUpz.order_and_cart_management.model.Cart;
import in.stepUpz.order_and_cart_management.model.Cartitem;
import in.stepUpz.order_and_cart_management.repository.CartItemRepository;
import in.stepUpz.order_and_cart_management.repository.CartRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private  final CartItemRepository cartItemRepository;

    public AddToCartResponse addToCart(UUID userId, AddToCartRequest request){
        if(request.getQuantity() == null || request.getQuantity()<=0){
            throw new BadRequestException("Quantity must me greater than 0");
        }

        Cart cart = cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            return cartRepository.save(newCart);
        });

        Cartitem cartitem = cartItemRepository.findByCartIdAndProductId(cart.getId(),request.getProductId()).orElseGet(() -> {
           Cartitem newCartitem = new Cartitem();
           newCartitem.setCart(cart);
           newCartitem.setProductId(request.getProductId());
           newCartitem.setQuantity(0);
           return newCartitem;
        });

        cartitem.setQuantity(cartitem.getQuantity()+ request.getQuantity());
        cartItemRepository.save(cartitem);
        return new AddToCartResponse("Product added to cart sucessfully",cart.getId());

    }
}
