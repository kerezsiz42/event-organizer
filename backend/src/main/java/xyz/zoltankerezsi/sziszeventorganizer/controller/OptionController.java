package xyz.zoltankerezsi.sziszeventorganizer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/option")
class OptionController {
    @GetMapping("/")
    String index() {
        return "Option";
    }
}
