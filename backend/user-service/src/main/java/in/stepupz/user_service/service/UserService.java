package in.stepupz.user_service.service;

import in.stepupz.user_service.model.User;
import in.stepupz.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(User user){
        return userRepository.save(user);
    }
}
