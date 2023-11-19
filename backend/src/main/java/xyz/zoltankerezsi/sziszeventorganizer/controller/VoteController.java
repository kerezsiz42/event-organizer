package xyz.zoltankerezsi.sziszeventorganizer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/vote")
class VoteController {
    @GetMapping("/")
    @Operation(summary = "Returns the string \"Vote\"")
    String index() {
        return "Vote";
    }
}
