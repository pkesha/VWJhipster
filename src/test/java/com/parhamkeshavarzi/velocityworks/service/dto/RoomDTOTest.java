package com.parhamkeshavarzi.velocityworks.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.parhamkeshavarzi.velocityworks.web.rest.TestUtil;

public class RoomDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoomDTO.class);
        RoomDTO roomDTO1 = new RoomDTO();
        roomDTO1.setId(1L);
        RoomDTO roomDTO2 = new RoomDTO();
        assertThat(roomDTO1).isNotEqualTo(roomDTO2);
        roomDTO2.setId(roomDTO1.getId());
        assertThat(roomDTO1).isEqualTo(roomDTO2);
        roomDTO2.setId(2L);
        assertThat(roomDTO1).isNotEqualTo(roomDTO2);
        roomDTO1.setId(null);
        assertThat(roomDTO1).isNotEqualTo(roomDTO2);
    }
}
