package dress_management_system.dressapp.service;

import dress_management_system.dressapp.model.Cart;

import java.util.List;

public interface CartService {
    void addCart(Cart cart);
    Cart getCartById(int id);
    List<Cart> getAllCarts();
    void updateCart(Cart cart);
    void deleteCart(int id);
}
