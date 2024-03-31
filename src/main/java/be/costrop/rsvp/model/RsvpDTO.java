package be.costrop.rsvp.model;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RsvpDTO {
	@NotBlank
	private String firstName;
	@NotBlank
	private String lastName;
	@NotNull
	private Boolean present;
	private DietaryRestriction dietaryRestriction;
	private String otherDietaryRestriction;
	private String extra;

	@AssertTrue
	public boolean isValid() {
		if (!present) return true;

		if (dietaryRestriction == DietaryRestriction.OTHER) {
			return StringUtils.isNotBlank(otherDietaryRestriction);
		}

		return dietaryRestriction != null;
	}

	public List<List<Object>> convertToRow() {
		final List<Object> values = new ArrayList<>(List.of(
			LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME),
			"%s %s".formatted(firstName, lastName),
			present ? "komen" : "komen niet"
		));

		Optional.ofNullable(dietaryRestriction).map(DietaryRestriction::name).ifPresent(values::add);
		Optional.ofNullable(otherDietaryRestriction).ifPresent(values::add);
		Optional.ofNullable(extra).filter(StringUtils::isNotBlank).ifPresent(values::add);
		return List.of(values);
	}
}
