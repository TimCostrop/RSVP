package be.costrop.rsvp.gsheets;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "google.sheets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class GoogleSheetsPropertyConfig {
	private String spreadsheetId;
	private String sheetReference;
	private String serviceAccountId;
}
