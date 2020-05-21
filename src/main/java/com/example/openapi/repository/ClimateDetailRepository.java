package com.example.openapi.repository;

import com.example.openapi.model.ClimateDetail;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClimateDetailRepository extends CrudRepository<ClimateDetail, Long> {
  List<ClimateDetail> findByOrderByDateAsc();
  List<ClimateDetail> findByTextContainingIgnoreCaseOrWeatherTagsContainingIgnoreCaseOrderByDateAsc(String text,
                                                                                                    String tag);
}
