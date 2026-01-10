package in.astha.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTO {

    private Long id;

    // Profile id (owner of this category)
    private Long profileId;

    private String name;

    private String icon;

    // INCOME or EXPENSE
    private String type;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
