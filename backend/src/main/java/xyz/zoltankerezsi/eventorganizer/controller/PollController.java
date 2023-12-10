package xyz.zoltankerezsi.eventorganizer.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
import jakarta.validation.constraints.Pattern;
import xyz.zoltankerezsi.eventorganizer.Constants;
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

	@Operation(summary = "Get all poll objects")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Retrieve all poll objects from database, does not throw exceptions. In case the database is empty, returns an empty array", content = {
					@Content(array = @ArraySchema(schema = @Schema(implementation = PollOutput.class))) }) })
	@GetMapping("/")
	ResponseEntity<List<PollOutput>> getPolls() {
		List<PollOutput> list = new ArrayList<>();
		pollRepository.findAll().forEach((poll) -> list.add(PollOutput.fromPoll(poll)));
		return ResponseEntity.ok(list);
	}

	@Operation(summary = "Get a single poll object by its id")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Retrieve a poll object from database if it exists", content = {
					@Content(schema = @Schema(implementation = PollOutput.class)) }),
			@ApiResponse(responseCode = "404", description = "Poll object not found", content = @Content(schema = @Schema(implementation = String.class))) })
	@GetMapping("/{id}")
	ResponseEntity<PollOutput> getPoll(
			@PathVariable(value = "id") @Pattern(regexp = Constants.UUID_REGEX, message = "Invalid UUID format") final String pollId) {
		return pollRepository.findById(pollId)
				.map(PollOutput::fromPoll)
				.map(ResponseEntity::ok)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, pollId));
	}

	@Operation(summary = "Update or insert a poll object into database")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Parse and validate poll object data, then update a poll object with the same id if it exists, or insert a new one", content = {
					@Content(schema = @Schema(implementation = PollOutput.class)) }),
			@ApiResponse(responseCode = "400", description = "Takes into action when any field of the poll object to be updated/inserted is invalid", content = @Content(schema = @Schema(implementation = Map.class))) })
	@PutMapping("/")
	ResponseEntity<PollOutput> putPoll(@RequestBody final PollInput input) {
		Optional<Poll> poll = pollRepository.findById(input.getPollId());
		List<Option> options = new ArrayList<>();
		optionRepository.findAllById(input.getOptions()).forEach(options::add);
		List<Vote> votes = new ArrayList<>();
		voteRepository.findAllById(input.getVotes()).forEach(votes::add);
		Poll p = poll.isEmpty()
				? new Poll(input.getPollId(), input.getTitle(), input.getDescription(), input.getFinalCost(),
						input.getMultipleChoice(), options, votes)
				: poll.get();
		pollRepository.save(p);
		return ResponseEntity.ok(PollOutput.fromPoll(p));
	}

	@Operation(summary = "Delete a poll object by its id")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Delete a poll object from database by id, or return successfully if it does not exist", content = {
					@Content(schema = @Schema(implementation = String.class)) }) })
	@DeleteMapping("/{id}")
	ResponseEntity<String> deletePoll(
			@PathVariable(value = "id") @Pattern(regexp = Constants.UUID_REGEX, message = "Invalid UUID format") final String pollId) {
		pollRepository.deleteById(pollId);
		return ResponseEntity.ok(pollId);
	}
}