package in.astha.expensetracker.service;

import in.astha.expensetracker.dto.ExpensesDTO;

import in.astha.expensetracker.entity.CategoryEntity;
import in.astha.expensetracker.entity.ExpenseEntity;
import in.astha.expensetracker.entity.ProfileEntity;
import in.astha.expensetracker.repository.CategoryRepository;
import in.astha.expensetracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final ProfileService profileService;

    public ExpensesDTO addExpense(ExpensesDTO dto) {

        ProfileEntity profile = profileService.getCurrentProfile();

        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        ExpenseEntity newExpense = toEntity(dto, profile, category);
        newExpense = expenseRepository.save(newExpense);

        return toDTO(newExpense);
    }
    public List<ExpensesDTO> getCurrentMonthExpensesForCurrentUser() {

        ProfileEntity profile = profileService.getCurrentProfile();

        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());

        List<ExpenseEntity> expenses = expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);

        return expenses.stream()
                .map(this::toDTO)
                .toList();
    }

    // delete expense by id for current user
    public void deleteExpense(Long expenseId) {

        ProfileEntity profile = profileService.getCurrentProfile();

        ExpenseEntity entity = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Authorization check
        if (!entity.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized to delete this expense");
        }

        expenseRepository.delete(entity);
    }
    // Get latest 5 expenses for current user
    public List<ExpensesDTO> getLatest5ExpensesForCurrentUser() {

        ProfileEntity profile = profileService.getCurrentProfile();

        List<ExpenseEntity> list = expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());

        return list.stream()
                .map(this::toDTO)
                .toList();
    }

    // Get total expenses for current user
    public BigDecimal getTotalExpenseForCurrentUser() {

        ProfileEntity profile = profileService.getCurrentProfile();

        BigDecimal total = expenseRepository.findTotalExpenseByProfileId(profile.getId());

        return total != null ? total : BigDecimal.ZERO;
    }

    public List<ExpensesDTO> filterExpenses(
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    ) {

        ProfileEntity profile = profileService.getCurrentProfile();

        List<ExpenseEntity> list =
                expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
                        profile.getId(),
                        startDate,
                        endDate,
                        keyword,
                        sort
                );

        return list.stream()
                .map(this::toDTO)
                .toList();
    }

    // Notifications: get expenses for user on specific date
    public List<ExpensesDTO> getExpensesForUserOnDate(Long profileId, LocalDate date) {
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDate(profileId, date);

        return list.stream()
                .map(this::toDTO)
                .toList();

    }
    // ================== Helper Methods ==================

    private ExpenseEntity toEntity(ExpensesDTO dto, ProfileEntity profile, CategoryEntity category) {
        return ExpenseEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private ExpensesDTO toDTO(ExpenseEntity entity) {
        return ExpensesDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null? entity.getCategory().getName() : "N/A")
                .amount(entity.getAmount())
                .date(entity.getDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

