package xyz.zoltankerezsi.eventorganizer.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import xyz.zoltankerezsi.eventorganizer.model.Option;

public interface OptionRepository extends CrudRepository<Option, UUID> {
}
