package xyz.zoltankerezsi.eventorganizer.controller;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import xyz.zoltankerezsi.eventorganizer.dto.PollInput;
import xyz.zoltankerezsi.eventorganizer.dto.PollOutput;
import xyz.zoltankerezsi.eventorganizer.model.Option;
import xyz.zoltankerezsi.eventorganizer.model.Poll;
import xyz.zoltankerezsi.eventorganizer.model.Vote;
import xyz.zoltankerezsi.eventorganizer.repository.OptionRepository;
import xyz.zoltankerezsi.eventorganizer.repository.PollRepository;
import xyz.zoltankerezsi.eventorganizer.repository.VoteRepository;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/polls", produces = "application/json")
class PollController {
	@Autowired
	private PollRepository pollRepository;

	@Autowired
	private OptionRepository optionRepository;

	@Autowired
	private VoteRepository voteRepository;

	@Operation(summary = "Visszaküldi az összess poll objektumot")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Visszaküldi az összess poll objektumot. Nem dob kivételt. Ha az adatbázis üres, akkor egy üres array-el tér vissza.", content = {
					@Content(array = @ArraySchema(schema = @Schema(implementation = PollOutput.class))) }) })
	@GetMapping
	ResponseEntity<List<PollOutput>> getPolls() {
		List<PollOutput> list = new ArrayList<>();
		pollRepository.findAll().forEach((poll) -> list.add(PollOutput.fromPoll(poll)));
		return ResponseEntity.ok(list);
	}

	@Operation(summary = "Lekérdez egy poll objektumot id alapján")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Visszaadja a poll objektumot az adatbázisból, ha létezik.", content = {
					@Content(schema = @Schema(implementation = PollOutput.class)) }),
			@ApiResponse(responseCode = "404", description = "Ha poll objektum nem található.", content = @Content(schema = @Schema(implementation = String.class))) })
	@GetMapping("/{id}")
	ResponseEntity<PollOutput> getPoll(@PathVariable(value = "id") final String pollId) {
		return pollRepository.findById(pollId)
				.map(PollOutput::fromPoll)
				.map(ResponseEntity::ok)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, pollId));
	}

	@Operation(summary = "Frissít vagy beilleszt egy poll objektumot az adatbázisba")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Validálja a bejövő poll objektum adatait, majd frissítit a poll objectumot, ha ugyonlyan id-val létezik az adatbázisban, különben beilleszt egy újat.", content = {
					@Content(schema = @Schema(implementation = PollOutput.class)) }),
			@ApiResponse(responseCode = "400", description = "Működésbe lép, ha a poll objectum bármely mezője a validációnak nem megfelelő formátumú. Visszaküldi a hibás mezőket és a hibát egy JSON objektumban.", content = @Content(schema = @Schema(implementation = Map.class))) })
	@PutMapping
	ResponseEntity<PollOutput> putPoll(@Valid @RequestBody final PollInput p) {
		List<Option> options = new ArrayList<>();
		optionRepository.findAllById(p.getOptions()).forEach(options::add);
		List<Vote> votes = new ArrayList<>();
		voteRepository.findAllById(p.getVotes()).forEach(votes::add);
		Poll poll = new Poll(p.getPollId(), p.getTitle(), p.getDescription(), p.getMultipleChoice(),
				options, votes);
		pollRepository.save(poll);
		return ResponseEntity.ok(PollOutput.fromPoll(poll));
	}

	@Operation(summary = "Kitöröl egy poll objektumot id alapján idempotens módon")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Kitöröl egy poll objektumot id alapján, ha létezik, vagy visszatér sikeresen ha nem létezett.", content = {
					@Content(schema = @Schema(implementation = String.class)) }) })
	@DeleteMapping("/{id}")
	ResponseEntity<String> deletePoll(
			@PathVariable(value = "id") final String pollId) {
		pollRepository.deleteById(pollId);
		return ResponseEntity.ok(String.format("\"%s\"", pollId));
	}
}