package in.astha.expensetracker.controller;

import in.astha.expensetracker.service.IncomeExcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeEmailController {

    private final IncomeExcelService incomeExcelService;

    @GetMapping("/email-excel")
    public ResponseEntity<String> emailIncomeExcel() {
        incomeExcelService.emailIncomeExcel();
        return ResponseEntity.ok("Income excel emailed successfully");
    }
}
