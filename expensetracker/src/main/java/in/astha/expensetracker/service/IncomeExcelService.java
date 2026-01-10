package in.astha.expensetracker.service;

import in.astha.expensetracker.entity.IncomeEntity;
import in.astha.expensetracker.entity.ProfileEntity;
import in.astha.expensetracker.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeExcelService {

    private final IncomeRepository incomeRepository;
    private final EmailService emailService;
    private final ProfileService profileService;

    // ================= EMAIL INCOME EXCEL =================
    public void emailIncomeExcel() {

        ProfileEntity profile = profileService.getCurrentProfile();

        byte[] excelBytes = generateIncomeExcel(profile.getId());

        emailService.sendEmailWithAttachment(
                profile.getEmail(),
                "Your Income Report",
                "<p>Please find your income report attached.</p>",
                excelBytes,
                "income-report.xlsx"
        );
    }

    // ================= GENERATE EXCEL =================
    public byte[] generateIncomeExcel(Long profileId) {

        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Income Summary");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("S.No");
            header.createCell(1).setCellValue("Name");
            header.createCell(2).setCellValue("Amount");
            header.createCell(3).setCellValue("Category");
            header.createCell(4).setCellValue("Date");

            List<IncomeEntity> incomes =
                    incomeRepository.findByProfileIdOrderByDateDesc(profileId);

            int rowNum = 1;
            int index = 1;

            for (IncomeEntity income : incomes) {

                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(index++);
                row.createCell(1).setCellValue(income.getName());
                row.createCell(2).setCellValue(
                        income.getAmount() != null
                                ? income.getAmount().doubleValue()
                                : 0
                );
                row.createCell(3).setCellValue(
                        income.getCategory() != null
                                ? income.getCategory().getName()
                                : "N/A"
                );
                row.createCell(4).setCellValue(
                        income.getDate() != null
                                ? income.getDate().toString()
                                : ""
                );
            }

            for (int i = 0; i < 5; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate income Excel file", e);
        }
    }
}
