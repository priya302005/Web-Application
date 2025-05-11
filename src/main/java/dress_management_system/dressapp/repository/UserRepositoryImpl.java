package dress_management_system.dressapp.repository;

import dress_management_system.dressapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void save(User user) {
        jdbcTemplate.update("INSERT INTO users (name, phone_number, age, mail_id) VALUES (?, ?, ?, ?)",
                user.getName(), user.getPhoneNumber(), user.getAge(), user.getMailId());
    }

    @Override
public User findById(int id) {
    return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?",
            new UserRowMapper(),
            id
    );
}


    @Override
    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM users", new UserRowMapper());
    }

    @Override
    public void update(User user) {
        jdbcTemplate.update("UPDATE users SET name = ?, phone_number = ?, age = ?, mail_id = ? WHERE id = ?",
                user.getName(), user.getPhoneNumber(), user.getAge(), user.getMailId(), user.getId());
    }

    @Override
    public void delete(int id) {
        jdbcTemplate.update("DELETE FROM users WHERE id = ?", id);
    }

    // ✅ Inner RowMapper Class
    private static class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setPhoneNumber(rs.getString("phone_number"));
            user.setAge(rs.getInt("age"));
            user.setMailId(rs.getString("mail_id"));
            return user;
        }
    }
}
