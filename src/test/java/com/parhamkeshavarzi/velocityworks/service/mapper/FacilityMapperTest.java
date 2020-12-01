package com.parhamkeshavarzi.velocityworks.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class FacilityMapperTest {

    private FacilityMapper facilityMapper;

    @BeforeEach
    public void setUp() {
        facilityMapper = new FacilityMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(facilityMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(facilityMapper.fromId(null)).isNull();
    }
}
