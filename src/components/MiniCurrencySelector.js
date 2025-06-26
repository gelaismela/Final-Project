import "../styles/MiniCurrencySelector.css";

// List of supported currencies
const currencies = [
  { code: "usd", symbol: "$", label: "USD" },
  { code: "eur", symbol: "€", label: "EUR" },
  { code: "gel", symbol: "₾", label: "GEL" },
];

const MiniCurrencySelector = ({ open, onClose, onSelect, selected }) => {
  if (!open) return null;

  return (
    <div className="mini-currency-selector" tabIndex={0} onBlur={onClose}>
      {currencies.map((c) => (
        <div
          key={c.code}
          className={`currency-option${selected === c.code ? " selected" : ""}`}
          onClick={() => {
            onSelect(c.code); // Set selected currency
            onClose(); // Close the selector
          }}
        >
          {c.symbol} {c.label}
        </div>
      ))}
    </div>
  );
};

export default MiniCurrencySelector;
