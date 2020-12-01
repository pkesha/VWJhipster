package com.parhamkeshavarzi.velocityworks.service.mapper;


import com.parhamkeshavarzi.velocityworks.domain.*;
import com.parhamkeshavarzi.velocityworks.service.dto.PersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Person} and its DTO {@link PersonDTO}.
 */
@Mapper(componentModel = "spring", uses = {RoomMapper.class})
public interface PersonMapper extends EntityMapper<PersonDTO, Person> {

    @Mapping(source = "room.id", target = "roomId")
    @Mapping(source = "room.name", target = "roomName")
    PersonDTO toDto(Person person);

    @Mapping(source = "roomId", target = "room")
    Person toEntity(PersonDTO personDTO);

    default Person fromId(Long id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setId(id);
        return person;
    }
}
