package be.costrop.rsvp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class SecurityConfiguration {

	@Bean
	public HttpFirewall defaultConfigHttpFirewall() {
		StrictHttpFirewall firewall = new StrictHttpFirewall();
		firewall.setAllowSemicolon(true);
		return firewall;
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource(@Value("${cors.allowed-origin-patterns}") List<String> allowedOriginPatterns) {
		final CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(allowedOriginPatterns);
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "PUT", "HEAD", "DELETE"));
		configuration.setAllowedHeaders(Collections.singletonList("*"));
		configuration.setAllowCredentials(true);
		configuration.addExposedHeader("Content-Type");
		configuration.addExposedHeader("Content-Disposition");
		configuration.addExposedHeader("pageCount");
		configuration.addExposedHeader("resultCount");
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, Environment environment, CorsConfigurationSource corsConfigurationSource) throws Exception {
		return http
			.csrf(AbstractHttpConfigurer::disable)
			.authorizeHttpRequests(cust -> cust.anyRequest().permitAll())
			.headers(cust -> cust.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
			.cors(cust -> cust.configurationSource(corsConfigurationSource))
			.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.NEVER))
			.build();
	}
}
