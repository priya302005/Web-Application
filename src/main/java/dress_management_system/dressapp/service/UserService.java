package dress_management_system.dressapp.service;

import dress_management_system.dressapp.model.User;
import java.util.List;

public interface UserService {
    void saveUser(User user);
    User getUserById(int id);
    List<User> getAllUsers();
    void updateUser(User user);
    void deleteUser(int id);
}

