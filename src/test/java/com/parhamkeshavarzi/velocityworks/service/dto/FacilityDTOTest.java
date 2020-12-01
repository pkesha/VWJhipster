package com.parhamkeshavarzi.velocityworks.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.parhamkeshavarzi.velocityworks.web.rest.TestUtil;

public class FacilityDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacilityDTO.class);
        FacilityDTO facilityDTO1 = new FacilityDTO();
        facilityDTO1.setId(1L);
        FacilityDTO facilityDTO2 = new FacilityDTO();
        assertThat(facilityDTO1).isNotEqualTo(facilityDTO2);
        facilityDTO2.setId(facilityDTO1.getId());
        assertThat(facilityDTO1).isEqualTo(facilityDTO2);
        facilityDTO2.setId(2L);
        assertThat(facilityDTO1).isNotEqualTo(facilityDTO2);
        facilityDTO1.setId(null);
        assertThat(facilityDTO1).isNotEqualTo(facilityDTO2);
    }
}
