package com.parhamkeshavarzi.velocityworks.repository;

import com.parhamkeshavarzi.velocityworks.domain.Facility;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Facility entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
}
