package in.astha.expensetracker.service;

import in.astha.expensetracker.dto.ExpensesDTO;
import in.astha.expensetracker.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseExcelService {

    private final ExpenseService expenseService;
    private final ProfileService profileService;
    private final EmailService emailService;

    public byte[] generateExpenseExcel() {

        List<ExpensesDTO> expenses =
                expenseService.getCurrentMonthExpensesForCurrentUser();

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Expenses");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Name");
            header.createCell(1).setCellValue("Amount");
            header.createCell(2).setCellValue("Category");
            header.createCell(3).setCellValue("Date");

            int rowIdx = 1;
            for (ExpensesDTO expense : expenses) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(expense.getName());
                row.createCell(1).setCellValue(expense.getAmount().doubleValue());
                row.createCell(2).setCellValue(expense.getCategoryName());
                row.createCell(3).setCellValue(expense.getDate().toString());
            }

            workbook.write(out);
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate expense excel", e);
        }
    }

    public void emailExpenseExcel() {

        ProfileEntity profile = profileService.getCurrentProfile();

        byte[] excel = generateExpenseExcel();

        emailService.sendEmailWithAttachment(
                profile.getEmail(),
                "Your Expense Report",
                "Please find attached your expense report.",
                excel,
                "expense_details.xlsx"
        );
    }
}
