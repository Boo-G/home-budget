// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// generate a random color
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`
}


// create budget
export const createBudget = ({name, amount}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: Number(amount),
    //color
    color: generateRandomColor()

  }
  // the ?? means if the left doesnt exist then return whats on the right.
  const existingBudgets = fetchData("budgets") ?? []
  return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
} 

// create expense
export const createExpense = ({name, amount, budgetId}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: Number(amount),
    budgetId: budgetId

  }
  // the ?? means if the left doesnt exist then return whats on the right.
  const existingExpenses = fetchData("expenses") ?? []
  return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
} 



// total spent by budget
export const calculateSpenyByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) =>{
    // check if the expense.id === budgetId we are looking for
    if(expense.budgetId !== budgetId) return acc

    // otherwise add it to the running total
    return acc += expense.amount

    // acc starts at 0 as shown below
  }, 0)
  return budgetSpent;
}

// get all items from local storage
export const getAllMatchingItems = ({category, key, value}) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
}


// delete an item from local storage
export const deleteItem = ({key,id}) => {
  const existingData = fetchData(key);
  if(id){
    const newData = existingData.filter((item) => item.id !== id )
    return localStorage.setItem(key,JSON.stringify(newData))
  }
  return localStorage.removeItem(key);
}

// FORMATTING

// format date to local string
export const formatDateToLocaleString = (epoch) => {
  return new Date(epoch).toLocaleDateString();
}


//Format percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style:"percent",
    minimumFractionDigits: 0
  })
}

// format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "CAD"
  })
}