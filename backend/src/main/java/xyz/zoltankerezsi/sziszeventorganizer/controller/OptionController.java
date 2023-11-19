package xyz.zoltankerezsi.sziszeventorganizer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/option", produces = "application/json")
class OptionController {
    @GetMapping("/")
    ResponseEntity<String> optionIndex() {
        return ResponseEntity.ok("\"Option\"");
    }
}
