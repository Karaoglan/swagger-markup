package com.example.openapi.service;

import com.example.openapi.model.ClimateDetail;
import com.example.openapi.repository.ClimateDetailRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClimateService {

  private ClimateDetailRepository repository;

  public ClimateService(ClimateDetailRepository repository) {
    this.repository = repository;
  }

  public List<ClimateDetail> getClimates() {
    List<ClimateDetail> list = new ArrayList<>();
    repository.findAll().forEach(item -> list.add(item));
    return list;
  }
}