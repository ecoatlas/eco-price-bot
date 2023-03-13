const currency = (number) => {
  // Create a constructor to enable language-sensitive number formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumSignificantDigits: 3,
  }).format(number)
}

export default currency
