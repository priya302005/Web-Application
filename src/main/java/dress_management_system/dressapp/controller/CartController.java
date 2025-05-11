package dress_management_system.dressapp.controller;

import dress_management_system.dressapp.model.Cart;
import dress_management_system.dressapp.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public String addCart(@RequestBody Cart cart) {
        cartService.addCart(cart);
        return "Cart item added successfully.";
    }

    @GetMapping("/{id}")
    public Cart getCartById(@PathVariable int id) {
        return cartService.getCartById(id);
    }

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @PutMapping("/{id}")
    public String updateCart(@PathVariable int id, @RequestBody Cart cart) {
        cart.setId(id);
        cartService.updateCart(cart);
        return "Cart updated successfully.";
    }

    @DeleteMapping("/{id}")
    public String deleteCart(@PathVariable int id) {
        cartService.deleteCart(id);
        return "Cart deleted successfully.";
    }
}
