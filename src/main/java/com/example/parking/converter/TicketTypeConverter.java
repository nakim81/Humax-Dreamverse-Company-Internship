package com.example.parking.converter;

import com.example.parking.common.enums.TicketType;
import jakarta.persistence.AttributeConverter;

public class TicketTypeConverter implements AttributeConverter<TicketType, String> {

    @Override
    public String convertToDatabaseColumn(TicketType attribute) {
        if(attribute == null)
            return null;
        return attribute.getCodeValue();
    }

    @Override
    public TicketType convertToEntityAttribute(String dbData) {
        if(dbData == null)
            return null;
        return TicketType.getEnum(dbData);
    }
}
