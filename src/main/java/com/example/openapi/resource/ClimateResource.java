package com.example.openapi.resource;

import com.example.openapi.model.ClimateDetail;
import com.example.openapi.service.ClimateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ClimateResource {

  private ClimateService service;

  public ClimateResource(ClimateService service) {
    this.service = service;
  }

  @GetMapping("/climates")
  public ResponseEntity<List<ClimateDetail>> getAllUsers() {
    final List<ClimateDetail> list = service.getClimates();
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

  @GetMapping("/climatesSameDate")
  public ResponseEntity<Map<Date, List<ClimateDetail>>> getAllUsersSameDate() {
    final Map<Date, List<ClimateDetail>> map = service.getClimatesWithSameDate();
    return new ResponseEntity<>(map, HttpStatus.OK);
  }
}
