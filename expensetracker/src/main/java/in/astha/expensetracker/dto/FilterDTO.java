package in.astha.expensetracker.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FilterDTO {

    private String type;

    private LocalDate startDate;

    private LocalDate endDate;

    private String keyword;

    // date, amount, name
    private String sortField;

    // asc or desc
    private String sortOrder;
}

