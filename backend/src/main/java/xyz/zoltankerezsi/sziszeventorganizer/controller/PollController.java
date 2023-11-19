package xyz.zoltankerezsi.sziszeventorganizer.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/poll")
class PollController {
	@GetMapping("/")
	String pollIndex() {
		return "Poll";
	}
}