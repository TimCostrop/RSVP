package be.costrop.rsvp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RsvpDTO {
	private String who;
	private boolean present;
	private Integer amount;
	private DietaryRestriction dietaryRestriction;
	private String otherDietaryRestriction;
}
