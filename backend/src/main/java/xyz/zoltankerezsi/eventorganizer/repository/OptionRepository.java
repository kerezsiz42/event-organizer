package xyz.zoltankerezsi.eventorganizer.repository;

import org.springframework.data.repository.CrudRepository;

import xyz.zoltankerezsi.eventorganizer.model.Option;

public interface OptionRepository extends CrudRepository<Option, String> {
}
