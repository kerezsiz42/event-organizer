package xyz.zoltankerezsi.sziszeventorganizer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/poll")
class PollController {
	@GetMapping("/")
	String index() {
		return "Poll";
	}
}