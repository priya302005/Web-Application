package dress_management_system.dressapp.repository;

import dress_management_system.dressapp.model.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CartRepositoryImpl implements CartRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Cart> cartRowMapper = new RowMapper<Cart>() {
        @Override
        public Cart mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            Cart cart = new Cart();
            cart.setId(rs.getInt("id"));
            cart.setUserId(rs.getInt("user_id"));
            cart.setDressId(rs.getInt("dress_id"));
            cart.setQuantity(rs.getInt("quantity"));
            return cart;
        }
    };

    @Override
    public void addCart(Cart cart) {
        String sql = "INSERT INTO cart (user_id, dress_id, quantity) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, cart.getUserId(), cart.getDressId(), cart.getQuantity());
    }

    @Override
    public Cart getCartById(int id) {
        String sql = "SELECT * FROM cart WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, cartRowMapper, id);
    }

    @Override
    public List<Cart> getAllCarts() {
        String sql = "SELECT * FROM cart";
        return jdbcTemplate.query(sql, cartRowMapper);
    }

    @Override
    public void updateCart(Cart cart) {
        String sql = "UPDATE cart SET user_id = ?, dress_id = ?, quantity = ? WHERE id = ?";
        jdbcTemplate.update(sql, cart.getUserId(), cart.getDressId(), cart.getQuantity(), cart.getId());
    }

    @Override
    public void deleteCart(int id) {
        String sql = "DELETE FROM cart WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
