package in.astha.expensetracker.controller;



import in.astha.expensetracker.dto.IncomeDTO;
import in.astha.expensetracker.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO dto) {

        IncomeDTO saved = incomeService.addIncome(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }
    // Get current month incomes for logged-in user
    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getIncomes() {

        List<IncomeDTO> incomes =
                incomeService.getCurrentMonthIncomesForCurrentUser();

        return ResponseEntity.ok(incomes);
    }
    // Delete income by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }
}

