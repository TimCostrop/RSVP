package be.costrop.rsvp.controller;

import be.costrop.rsvp.gsheets.GoogleSheetService;
import be.costrop.rsvp.model.RsvpDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( "/api")
@AllArgsConstructor
@Slf4j
public class ApiController {

	private final GoogleSheetService googleSheetService;

    @PostMapping("/rsvp")
	@ResponseStatus(HttpStatus.OK)
    public void submitRSVP(@RequestBody RsvpDTO dto) {
		log.info("Received stuffs! {}", dto);
		googleSheetService.addLineToGoogleSheet(dto);
    }
}
