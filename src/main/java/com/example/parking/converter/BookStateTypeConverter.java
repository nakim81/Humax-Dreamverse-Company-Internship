package com.example.parking.converter;

import com.example.parking.common.enums.BookState;
import jakarta.persistence.AttributeConverter;

public class BookStateTypeConverter implements AttributeConverter<BookState, String> {

    @Override
    public String convertToDatabaseColumn(BookState attribute) {
        if(attribute == null)
            return null;
        return attribute.getCodeValue();
    }

    @Override
    public BookState convertToEntityAttribute(String dbData) {
        if(dbData == null)
            return null;
        return BookState.getEnum(dbData);
    }
}
