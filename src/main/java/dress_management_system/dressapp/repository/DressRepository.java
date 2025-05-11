package dress_management_system.dressapp.repository;

import dress_management_system.dressapp.model.Dress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class DressRepository {

    @Autowired
    private DataSource dataSource;

    // ✅ Find all dresses
    public List<Dress> findAll() {
        List<Dress> dresses = new ArrayList<>();
        String query = "SELECT * FROM dress";

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                Dress dress = new Dress();
                dress.setId(rs.getInt("id"));
                dress.setName(rs.getString("name"));
                dress.setDescription(rs.getString("description"));
                dress.setPrice(rs.getDouble("price"));
                dress.setSize(rs.getString("size"));
                dress.setColor(rs.getString("color"));
                dress.setQuantity(rs.getInt("quantity"));
                dress.setImageUrl(rs.getString("image_url"));
                dresses.add(dress);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return dresses;
    }

    // ✅ Save a new dress
    public void save(Dress dress) {
        String query = "INSERT INTO dress (name, description, price, size, color, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setString(1, dress.getName());
            ps.setString(2, dress.getDescription());
            ps.setDouble(3, dress.getPrice());
            ps.setString(4, dress.getSize());
            ps.setString(5, dress.getColor());
            ps.setInt(6, dress.getQuantity());
            ps.setString(7, dress.getImageUrl());
            ps.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ✅ Find by ID returning Optional<Dress>
    public Optional<Dress> findById(int id) {
        Dress dress = null;
        String query = "SELECT * FROM dress WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                dress = new Dress();
                dress.setId(rs.getInt("id"));
                dress.setName(rs.getString("name"));
                dress.setDescription(rs.getString("description"));
                dress.setPrice(rs.getDouble("price"));
                dress.setSize(rs.getString("size"));
                dress.setColor(rs.getString("color"));
                dress.setQuantity(rs.getInt("quantity"));
                dress.setImageUrl(rs.getString("image_url"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Optional.ofNullable(dress);
    }

    // ✅ Update dress
    public void updateDress(int id, Dress dress) {
        String sql = "UPDATE dress SET name = ?, description = ?, price = ?, size = ?, color = ?, quantity = ?, image_url = ? WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, dress.getName());
            ps.setString(2, dress.getDescription());
            ps.setDouble(3, dress.getPrice());
            ps.setString(4, dress.getSize());
            ps.setString(5, dress.getColor());
            ps.setInt(6, dress.getQuantity());
            ps.setString(7, dress.getImageUrl());
            ps.setInt(8, id);

            ps.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ✅ Delete dress by ID
    public void deleteById(int id) {
        String query = "DELETE FROM dress WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, id);
            ps.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ✅ Check if dress exists by ID
    public boolean existsById(int id) {
        String query = "SELECT COUNT(*) FROM dress WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(query)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
