package com.parhamkeshavarzi.velocityworks.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RoomMapperTest {

    private RoomMapper roomMapper;

    @BeforeEach
    public void setUp() {
        roomMapper = new RoomMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(roomMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(roomMapper.fromId(null)).isNull();
    }
}
