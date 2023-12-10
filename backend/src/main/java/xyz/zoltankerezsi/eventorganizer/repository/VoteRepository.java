package xyz.zoltankerezsi.eventorganizer.repository;

import org.springframework.data.repository.CrudRepository;

import xyz.zoltankerezsi.eventorganizer.model.Vote;

public interface VoteRepository extends CrudRepository<Vote, String> {
}
