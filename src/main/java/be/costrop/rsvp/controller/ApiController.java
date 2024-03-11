package be.costrop.rsvp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController( "/api")
public class ApiController {

    @PostMapping("/rsvp")
    public void submitRSVP() {
        throw new UnsupportedOperationException("To be implemented");
    }
}
