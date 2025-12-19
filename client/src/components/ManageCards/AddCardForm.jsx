import React, { useState, useEffect } from "react";
import VisaLogo from "../../assets/Visa_Inc._logo.svg";
import MastercardLogo from "../../assets/Mastercard_2019_logo.svg";
import AmexLogo from "../../assets/American_Express_logo_(2018).svg";

const detectCardType = (cardNumber) => {
  const number = cardNumber.replace(/\s+/g, "");
  if (!number) return "";
  if (/^4/.test(number)) return "VISA";
  if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return "MASTERCARD";
  if (/^3[47]/.test(number)) return "AMEX";
  if (/^507803/.test(number)) return "MEEZA";
  return "OTHER"; // fallback
};


const cardLogos = {
  Visa: VisaLogo,
  Mastercard: MastercardLogo,
  "American Express": AmexLogo,
  Meeza: null,
};

export default function AddCardForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    balance: "0.00",
  });
  const [detectedType, setDetectedType] = useState("");

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    setDetectedType(detectCardType(form.cardNumber));
  }, [form.cardNumber]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, "");
    return v.match(/.{1,4}/g)?.join(" ") || "";
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) return v.slice(0, 2) + "/" + v.slice(2, 4);
    return v;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedNumber = form.cardNumber.replace(/\s+/g, "");
    if (!formattedNumber || !form.cardHolder || !form.expiryDate || !form.cvv || !detectedType) {
      alert("Please fill all required fields and enter a valid card number");
      return;
    }

    try {

      await onAdd({
        ...form,
        cardNumber: formattedNumber,
        cardType: detectedType,
      });
      alert("Card added successfully!");
    } catch (err) {
      alert(err.message || "Failed to create the card");
    }
  };


  const renderCardLogo = () => {
    if (!detectedType) return <span className="text-white/50 text-xs">Enter card</span>;
    const logo = cardLogos[detectedType];
    if (logo) return <img src={logo} alt={detectedType} className="h-6 w-auto object-contain" />;
    return <span className="text-green-400 text-sm font-semibold">{detectedType}</span>;
  };

  return (
    <div className="ff-card-Transfer p-5 w-full max-w-[700px]">
      <h3 className="text-lg font-semibold mb-4 text-center text-white">Add New Card</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Card Number & Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium mb-1 text-white/90">Card Number</label>
            <div className="relative">
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChange={(e) => update("cardNumber", formatCardNumber(e.target.value))}
                maxLength={19}
                className="ff-input font-mono tracking-wider pr-20 py-2 text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                {renderCardLogo()}
              </div>
            </div>
            {form.cardNumber && !detectedType && (
              <p className="text-yellow-400/80 text-xs mt-1">Card type not recognized</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 text-white/90">Card Holder</label>
            <input
              type="text"
              placeholder="AHMED"
              value={form.cardHolder}
              onChange={(e) => update("cardHolder", e.target.value.toUpperCase())}
              className="ff-input uppercase py-2 text-sm"
            />
          </div>
        </div>

        {/* Expiry, CVV, Balance, Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-xs font-medium mb-1 text-white/90">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={form.expiryDate}
              onChange={(e) => update("expiryDate", formatExpiry(e.target.value))}
              maxLength={5}
              className="ff-input py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 text-white/90">CVV</label>
            <input
              type="password"
              placeholder="***"
              value={form.cvv}
              onChange={(e) => update("cvv", e.target.value.replace(/\D/g, ""))}
              maxLength={4}
              className="ff-input py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 text-white/90">Balance</label>
            <input
              type="text"
              placeholder="0.00"
              value={form.balance}
              onChange={(e) => update("balance", e.target.value.replace(/[^0-9.]/g, ""))}
              className="ff-input py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!detectedType}
            className="py-2 rounded-xl bg-gradient-to-r from-[#62A6BF]/80 via-[#49EB8C]/80 to-[#65E67F]/80 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Add Card
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
