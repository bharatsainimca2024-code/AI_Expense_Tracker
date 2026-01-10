
package in.astha.expensetracker.service;

import in.astha.expensetracker.dto.ExpensesDTO;
import in.astha.expensetracker.entity.ProfileEntity;
import in.astha.expensetracker.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${expense.tracker.frontend.url}")
    private String frontendUrl;

    // Runs every day at 10:00 PM IST
    @Scheduled(cron = "0 0 22 * * *", zone = "Asia/Kolkata")
    public void sendDailyIncomeExpenseReminder() {

        log.info("Job started: sendDailyIncomeExpenseReminder()");

        List<ProfileEntity> profiles = profileRepository.findAll();

        for (ProfileEntity profile : profiles) {
            try {
                String body =
                        "Hi " + profile.getFullName() + ",<br><br>"
                                + "This is a friendly reminder to add your income and expenses for today in Expense Tracker.<br><br>"
                                + "<a href='" + frontendUrl + "' "
                                + "style='display:inline-block;padding:10px 20px;"
                                + "background-color:#4CAF50;color:white;"
                                + "text-decoration:none;border-radius:5px;'>"
                                + "Add Now</a>"
                                + "<br><br>Best regards,<br>Expense Tracker Team";

                emailService.sendHtmlEmail(
                        profile.getEmail(),
                        "Daily reminder: Add your income and expenses",
                        body
                );
            } catch (Exception e) {
                log.error("Failed to send reminder email to {}", profile.getEmail(), e);
            }
        }
    }

    // Runs every day at 11:00 PM IST
    @Scheduled(cron = "0 0 23 * * *", zone = "Asia/Kolkata")
    public void sendDailyExpenseSummary() {

        log.info("Job started: sendDailyExpenseSummary()");

        List<ProfileEntity> profiles = profileRepository.findAll();

        for (ProfileEntity profile : profiles) {

            List<ExpensesDTO> todaysExpenses =
                    expenseService.getExpensesForUserOnDate(
                            profile.getId(),
                            LocalDate.now()
                    );

            if (todaysExpenses.isEmpty()) {
                continue;
            }

            try {
                StringBuilder table = new StringBuilder();

                table.append("<table style='border-collapse:collapse;width:100%;'>");

                table.append(
                        "<tr style='background-color:#f2f2f2;'>"
                                + "<th style='border:1px solid #ddd;padding:8px;'>S.No</th>"
                                + "<th style='border:1px solid #ddd;padding:8px;'>Name</th>"
                                + "<th style='border:1px solid #ddd;padding:8px;'>Amount</th>"
                                + "<th style='border:1px solid #ddd;padding:8px;'>Category</th>"
                                + "</tr>"
                );

                int i = 1;

                for (ExpensesDTO expense : todaysExpenses) {
                    table.append("<tr>");

                    table.append("<td style='border:1px solid #ddd;padding:8px;'>")
                            .append(i++)
                            .append("</td>");

                    table.append("<td style='border:1px solid #ddd;padding:8px;'>")
                            .append(expense.getName())
                            .append("</td>");

                    table.append("<td style='border:1px solid #ddd;padding:8px;'>")
                            .append(expense.getAmount())
                            .append("</td>");

                    table.append("<td style='border:1px solid #ddd;padding:8px;'>")
                            .append(
                                    expense.getCategoryName() != null
                                            ? expense.getCategoryName()
                                            : "N/A"
                            )
                            .append("</td>");

                    table.append("</tr>");
                }

                table.append("</table>");

                String body =
                        "Hi " + profile.getFullName()
                                + ",<br/><br/>"
                                + "Here is a summary of your expenses for today:"
                                + "<br/><br/>"
                                + table
                                + "<br/><br/>Best regards,<br/>Expense Tracker Team";

                emailService.sendHtmlEmail(
                        profile.getEmail(),
                        "Your daily expense summary",
                        body
                );

            } catch (Exception e) {
                log.error("Failed to send expense summary to {}", profile.getEmail(), e);
            }
        }

        log.info("Job completed: sendDailyExpenseSummary()");
    }
}

