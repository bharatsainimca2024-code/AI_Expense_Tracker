export const prepareIncomeLineChartData = (transactions = []) => {
  if (!transactions.length) return [];

  const grouped = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

    if (!grouped[date]) {
      grouped[date] = 0;
    }
    grouped[date] += Number(tx.amount || 0);
  });

  return Object.keys(grouped).map((date) => ({
    date,
    amount: grouped[date],
  }));
};
