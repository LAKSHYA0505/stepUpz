package in.stepupz.user_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import in.stepupz.user_service.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
     Optional<User> findByEmail(String email);
}
