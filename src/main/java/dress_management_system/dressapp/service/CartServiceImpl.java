package dress_management_system.dressapp.service;

import dress_management_system.dressapp.model.Cart;
import dress_management_system.dressapp.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public void addCart(Cart cart) {
        cartRepository.addCart(cart);
    }

    @Override
    public Cart getCartById(int id) {
        return cartRepository.getCartById(id);
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.getAllCarts();
    }

    @Override
    public void updateCart(Cart cart) {
        cartRepository.updateCart(cart);
    }

    @Override
    public void deleteCart(int id) {
        cartRepository.deleteCart(id);
    }
}
