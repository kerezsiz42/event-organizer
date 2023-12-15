package xyz.zoltankerezsi.eventorganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import xyz.zoltankerezsi.eventorganizer.model.Poll;

public interface PollRepository extends JpaRepository<Poll, String> {
}
