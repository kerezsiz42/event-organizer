package xyz.zoltankerezsi.eventorganizer.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import xyz.zoltankerezsi.eventorganizer.model.Poll;

public interface PollRepository extends CrudRepository<Poll, UUID> {
}
