package in.stepupz.user_service.service;

import in.stepupz.user_service.dao.AuthResponse;
import in.stepupz.user_service.dao.SignInRequest;
import in.stepupz.user_service.dao.SignUpRequest;
import in.stepupz.user_service.model.Role;
import in.stepupz.user_service.model.User;
import in.stepupz.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    private final UserRepository userRepository;

    private final Jwtservice jwtService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,Jwtservice jwtService,PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager){
        this.userRepository=userRepository;
        this.jwtService=jwtService;
        this.passwordEncoder=passwordEncoder;
        this.authenticationManager=authenticationManager;
    }

    public AuthResponse registerUser(SignUpRequest signUpRequest){
        User user= User.builder()
                .name(signUpRequest.getName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .build();

        userRepository.save(user);
        String jwtToken=jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }

    public AuthResponse loginUser(SignInRequest signInRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(),signInRequest.getPassword()));

        User user = userRepository.findByEmail(signInRequest.getEmail()).orElseThrow();

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken);
    }
}
