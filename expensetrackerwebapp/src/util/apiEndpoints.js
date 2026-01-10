export const BASE_URL = "http://localhost:8080/api/v1.0";

export const CLOUDINARY_CLOUD_NAME = "dydw4v8ta";

export const API_ENDPOINTS = {
  // ================= AUTH =================
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",

  // ================= CATEGORY =================
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: "/categories",
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,

  // ================= INCOME =================
  GET_ALL_INCOMES: "/incomes",
  ADD_INCOME: "/incomes",
  DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD: "/incomes/excel",
  EMAIL_INCOME: "/incomes/email-excel",

  // ================= EXPENSE =================
  GET_ALL_EXPENSES: "/expenses",
  ADD_EXPENSE: "/expenses",
  DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  EXPENSE_EXCEL_DOWNLOAD: "/expenses/excel",
  EMAIL_EXPENSE: "/expenses/email-excel",

  APPLY_FILTERS: "/filter",
  DASHBOARD_DATA: "/dashboard",

  // ================= CHATBOT (✅ NEW) =================
  CHAT: "/chat",

  // ================= UPLOAD =================
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
