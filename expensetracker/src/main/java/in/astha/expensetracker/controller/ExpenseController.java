package in.astha.expensetracker.controller;

import in.astha.expensetracker.dto.ExpensesDTO;
import in.astha.expensetracker.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpensesDTO> addExpense(@RequestBody ExpensesDTO dto) {

        ExpensesDTO saved = expenseService.addExpense(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    // Get current month expenses for logged-in user
    @GetMapping
    public ResponseEntity<List<ExpensesDTO>> getExpenses() {

        List<ExpensesDTO> expenses = expenseService.getCurrentMonthExpensesForCurrentUser();

        return ResponseEntity.ok(expenses);
    }
    // Delete expense by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}

