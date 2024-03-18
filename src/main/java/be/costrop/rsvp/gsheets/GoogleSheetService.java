package be.costrop.rsvp.gsheets;

import be.costrop.rsvp.model.RsvpDTO;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.google.auth.oauth2.ServiceAccountCredentials;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GoogleSheetService {

	private static final String APPLICATION_NAME = "RSVP applet";
	private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
	private static final List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS);
	private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

	private final GoogleSheetsPropertyConfig googleSheetsPropertyConfig;

	private Sheets loadedService;
	private ServiceAccountCredentials loadedCredentials;

	public void addLineToGoogleSheet(RsvpDTO info) {
		try {
			final var newRow = new ValueRange()
				.setValues(info.convertToRow());
			final var sheetsApiService = getSheetsService();
			final var updateResult = sheetsApiService.spreadsheets().values()
				.append(googleSheetsPropertyConfig.getSpreadsheetId(), googleSheetsPropertyConfig.getSheetReference(), newRow)
				.setValueInputOption("USER_ENTERED")
				.setAccessToken(getCredentials().getAccessToken().getTokenValue())
				.execute();

			log.info("Successfully added RSVP row : {} to line {}", info, updateResult.getUpdates().getUpdatedRows());

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private Sheets getSheetsService() throws IOException, GeneralSecurityException {
		if (this.loadedService == null) {
			final NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
			this.loadedService = new Sheets.Builder(httpTransport, JSON_FACTORY, httpRequest -> {
			})
				.setApplicationName(APPLICATION_NAME)
				.build();
		}

		return this.loadedService;
	}

	private ServiceAccountCredentials getCredentials() throws IOException {
		if (this.loadedCredentials != null) {
			if (this.loadedCredentials.getAccessToken().getExpirationTime().before(new Date())) {
				this.loadedCredentials.refresh();
			}
			return this.loadedCredentials;
		}

		// Load client secrets.
		try (InputStream in = GoogleSheetService.class.getResourceAsStream(CREDENTIALS_FILE_PATH)) {
			this.loadedCredentials = (ServiceAccountCredentials) ServiceAccountCredentials.fromStream(in)
				.createScoped(SCOPES);
			this.loadedCredentials.refresh();
			return this.loadedCredentials;
		}
	}
}
