package in.stepupz.user_service.controller;

import in.stepupz.user_service.dao.AuthResponse;
import in.stepupz.user_service.dao.SignInRequest;
import in.stepupz.user_service.dao.SignUpRequest;
import in.stepupz.user_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authService.registerUser(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(authService.loginUser(signInRequest));
    }
}
