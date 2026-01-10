
package in.astha.expensetracker.service;

import in.astha.expensetracker.dto.AuthDTO;
import in.astha.expensetracker.dto.ProfileDTO;
import in.astha.expensetracker.entity.ProfileEntity;
import in.astha.expensetracker.repository.ProfileRepository;
import in.astha.expensetracker.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final AppUserDetailsService appUserDetailsService;

    @Value("${app.activation.url}")
    private String activationURL;

    // ================= REGISTER =================
    public ProfileDTO registerProfile(ProfileDTO profileDTO) {

        ProfileEntity newProfile = toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());

        newProfile = profileRepository.save(newProfile);

        String activationLink =
                activationURL + "/api/v1.0/activate?token=" + newProfile.getActivationToken();

        String subject = "Activate your Expense Tracker account";
        String body =
                "Hi " + newProfile.getFullName() + ",<br><br>"
                        + "Click on the link below to activate your account:<br><br>"
                        + "<a href='" + activationLink + "'>Activate Account</a>"
                        + "<br><br>Thanks,<br>Expense Tracker Team";

        emailService.sendHtmlEmail(
                newProfile.getEmail(),
                subject,
                body
        );

        return toDTO(newProfile);
    }

    // ================= ACTIVATE =================
    public boolean activateProfile(String activationToken) {
        return profileRepository.findByActivationToken(activationToken)
                .map(profile -> {
                    profile.setActive(true);
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }

    public boolean isAccountActive(String email) {
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getActive)
                .orElse(false);
    }

    // ================= CURRENT USER =================
    public ProfileEntity getCurrentProfile() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Profile not found with email: " + authentication.getName()
                        )
                );
    }

    public ProfileDTO getPublicProfile(String email) {

        ProfileEntity currentUser;

        if (email == null) {
            currentUser = getCurrentProfile();
        } else {
            currentUser = profileRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new UsernameNotFoundException(
                                    "Profile not found with email: " + email
                            )
                    );
        }

        return toDTO(currentUser);
    }

    // ================= LOGIN =================
    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authDTO.getEmail(),
                            authDTO.getPassword()
                    )
            );

            UserDetails userDetails =
                    appUserDetailsService.loadUserByUsername(authDTO.getEmail());

            String token = jwtUtil.generateToken(userDetails);

            return Map.of(
                    "token", token,
                    "user", getPublicProfile(authDTO.getEmail())
            );

        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }

    // ================= MAPPERS =================
    private ProfileEntity toEntity(ProfileDTO dto) {
        return ProfileEntity.builder()
                .id(dto.getId())
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .profileImageUrl(dto.getProfileImageUrl())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .build();
    }

    private ProfileDTO toDTO(ProfileEntity entity) {
        return ProfileDTO.builder()
                .id(entity.getId())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .profileImageUrl(entity.getProfileImageUrl())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}



