package dress_management_system.dressapp.repository;

import dress_management_system.dressapp.model.Cart;

import java.util.List;

public interface CartRepository {
    void addCart(Cart cart);
    Cart getCartById(int id);
    List<Cart> getAllCarts();
    void updateCart(Cart cart);
    void deleteCart(int id);
}
