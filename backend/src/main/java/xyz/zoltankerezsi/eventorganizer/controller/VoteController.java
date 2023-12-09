package xyz.zoltankerezsi.eventorganizer.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/votes", produces = "application/json")
class VoteController {
    @GetMapping("/")
    @Operation(summary = "Returns the string \"Vote\"")
    String getVotes() {
        return "Vote";
    }
}
