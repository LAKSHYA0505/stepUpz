package in.stepupz.user_service.controller;

import in.stepupz.user_service.dao.SignUpRequest;
import in.stepupz.user_service.model.User;
import in.stepupz.user_service.service.AuthService;
import in.stepupz.user_service.service.UserService;
import jdk.jfr.Enabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity(prePostEnabled = true)
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private  AuthService authService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public User createUser(@RequestBody User user){
        authService.registerUser(new SignUpRequest(user.getName(),user.getEmail(),user.getPassword()));
        User createdUser=userService.getEmail(user.getEmail()).orElseThrow();
        return ResponseEntity.ok(createdUser).getBody();
    }

    @GetMapping("/me")
    public ResponseEntity<User> findProfile(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        User user= (User) authentication.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> findByEmail(@PathVariable String email){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        User user= (User) authentication.getPrincipal();
        if(!user.getEmail().equals(email)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(user);
    }

}
