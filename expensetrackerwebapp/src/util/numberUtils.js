// Format number with thousand separators (Indian format)
export const addThousandsSeparator = (value) => {
  if (value === null || value === undefined) return "0";

  const number = Number(value);

  if (isNaN(number)) return "0";

  return number.toLocaleString("en-IN");
};

// Optional: currency formatter (₹)
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "₹0";

  const number = Number(value);

  if (isNaN(number)) return "₹0";

  return `₹${number.toLocaleString("en-IN")}`;
};

// Optional: compact number (1K, 1M)
export const formatCompact = (value) => {
  if (value === null || value === undefined) return "0";

  const number = Number(value);

  if (isNaN(number)) return "0";

  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
};
