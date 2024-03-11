package be.costrop.rsvp.gsheets;

public record GoogleSheetLineInfo(
        String who,
        boolean coming,
        String allergiesOrFoodPreferences) {
}
