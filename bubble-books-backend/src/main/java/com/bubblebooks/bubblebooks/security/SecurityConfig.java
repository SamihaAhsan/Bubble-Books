package com.bubblebooks.bubblebooks.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import com.bubblebooks.bubblebooks.services.AuthService;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> {})
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login", "/signup", "/csrf", "/error").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
    .loginPage("/login")
    .loginProcessingUrl("/login")
    .successHandler((request, response, authentication) -> {
        response.setStatus(200);
    })
    .failureHandler((request, response, exception) -> {
        response.setStatus(401);
    })
    .permitAll()
)
                .logout(logout -> logout
                        .logoutSuccessUrl("http://localhost:5173/login?logout")
                )
                .build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(AuthService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider =
            new DaoAuthenticationProvider(userDetailsService);

        provider.setPasswordEncoder(passwordEncoder);

        return provider;
}
}