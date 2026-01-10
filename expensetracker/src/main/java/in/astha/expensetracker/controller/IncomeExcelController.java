package in.astha.expensetracker.controller;

import in.astha.expensetracker.service.IncomeExcelService;
import in.astha.expensetracker.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeExcelController {

    private final IncomeExcelService incomeExcelService;
    private final ProfileService profileService;

    @GetMapping("/excel")
    public ResponseEntity<byte[]> downloadIncomeExcel() {

        Long profileId = profileService.getCurrentProfile().getId();

        byte[] excel = incomeExcelService.generateIncomeExcel(profileId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=income-details.xlsx"
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excel);
    }
}
