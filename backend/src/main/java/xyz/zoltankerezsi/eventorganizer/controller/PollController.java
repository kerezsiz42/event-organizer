package xyz.zoltankerezsi.eventorganizer.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/polls", produces = "application/json")
class PollController {
	@GetMapping("/")
	String pollIndex() {
		return "Poll";
	}
}