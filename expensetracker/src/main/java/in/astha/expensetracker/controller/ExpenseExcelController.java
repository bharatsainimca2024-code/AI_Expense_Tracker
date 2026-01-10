package in.astha.expensetracker.controller;

import in.astha.expensetracker.service.ExpenseExcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseExcelController {

    private final ExpenseExcelService expenseExcelService;

    @GetMapping("/excel")
    public ResponseEntity<byte[]> downloadExpenseExcel() {

        byte[] excelData = expenseExcelService.generateExpenseExcel();

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=expense_details.xlsx"
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelData);
    }
}
