package dress_management_system.dressapp.repository;

import dress_management_system.dressapp.model.User;
import java.util.List;

public interface UserRepository {
    void save(User user);
    User findById(int id);
    List<User> findAll();
    void update(User user);
    void delete(int id);
}

