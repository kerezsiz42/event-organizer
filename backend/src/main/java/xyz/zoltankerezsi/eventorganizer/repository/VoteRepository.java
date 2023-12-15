package xyz.zoltankerezsi.eventorganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import xyz.zoltankerezsi.eventorganizer.model.Vote;

public interface VoteRepository extends JpaRepository<Vote, String> {
}
