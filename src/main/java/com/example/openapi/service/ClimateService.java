package com.example.openapi.service;

import com.example.openapi.model.ClimateDetail;
import com.example.openapi.repository.ClimateDetailRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClimateService {

  private ClimateDetailRepository repository;

  private Map<Date, List<ClimateDetail>> map = new HashMap<>();

  public ClimateService(ClimateDetailRepository repository) {
    this.repository = repository;
  }

  public List<ClimateDetail> getClimates() {
    List<ClimateDetail> list = new ArrayList<>();
    repository.findAll().forEach(item -> {
      list.add(item);
      if (map.get(item.getDate()) != null) {
        map.put(item.getDate(), map.get(item.getDate()));
      } else {
        List<ClimateDetail> climates = new ArrayList<>();
        climates.add(item);
        map.put(item.getDate(), climates);
      }
    });
    return list;
  }

  public Map<Date, List<ClimateDetail>> getClimatesWithSameDate() {
    return map;
  }
}
