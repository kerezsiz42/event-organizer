package xyz.zoltankerezsi.eventorganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import xyz.zoltankerezsi.eventorganizer.model.Option;

public interface OptionRepository extends JpaRepository<Option, String> {
}
