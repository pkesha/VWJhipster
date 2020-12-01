package com.parhamkeshavarzi.velocityworks.service.mapper;


import com.parhamkeshavarzi.velocityworks.domain.*;
import com.parhamkeshavarzi.velocityworks.service.dto.FacilityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Facility} and its DTO {@link FacilityDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FacilityMapper extends EntityMapper<FacilityDTO, Facility> {



    default Facility fromId(Long id) {
        if (id == null) {
            return null;
        }
        Facility facility = new Facility();
        facility.setId(id);
        return facility;
    }
}
