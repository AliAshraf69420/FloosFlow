import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisaLogo from "../../assets/Visa_Inc._logo.svg";
import MastercardLogo from "../../assets/Mastercard_2019_logo.svg";
import AmexLogo from "../../assets/American_Express_logo_(2018).svg";

const cardLogos = {
  Visa: VisaLogo,
  Mastercard: MastercardLogo,
  "American Express": AmexLogo,
};

const mockCards = [
  {
    id: 1,
    cardNumber: "**** **** **** 4532",
    cardHolder: "WAEL AL ABYD",
    expiryDate: "12/27",
    balance: "25,430.00",
    currency: "EGP",
    cardType: "Visa",
  },
  {
    id: 2,
    cardNumber: "**** **** **** 8891",
    cardHolder: "WAEL AL ABYD",
    expiryDate: "08/26",
    balance: "12,850.00",
    currency: "EGP",
    cardType: "Mastercard",
  },
];

export default function CardSection() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedCard = mockCards[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? mockCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === mockCards.length - 1 ? 0 : prev + 1));
  };

  const renderCardLogo = (cardType) => {
    const logo = cardLogos[cardType];
    if (logo) {
      return <img src={logo} alt={cardType} className="h-8 w-auto object-contain" />;
    }
    return <span className="text-green-400 font-semibold">{cardType}</span>;
  };

  return (
    <section className="w-full max-w-5xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">My Cards</h2>
        <button
          type="button"
          onClick={() => navigate("/ManageCards")}
          className="text-sm text-[#49EB8C] hover:text-[#65E67F] transition-colors font-medium"
        >
          Manage Cards
        </button>
      </div>

      <div className="ff-card-Transfer p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Navigation & Card Info */}
          <div className="flex items-center gap-4 w-full">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              aria-label="Previous card"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Card Info */}
            <div className="flex-1 bg-white/5 rounded-xl p-4 sm:p-6">
              {/* Top Row - Logo & Balance */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {renderCardLogo(selectedCard.cardType)}
                  <span className="text-white/60 text-sm">{selectedCard.cardType}</span>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs">Balance</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] font-bold text-xl">
                    {selectedCard.currency} {selectedCard.balance}
                  </p>
                </div>
              </div>

              {/* Card Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-white/50 text-xs mb-1">Card Number</p>
                  <p className="text-white font-mono">{selectedCard.cardNumber}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Card Holder</p>
                  <p className="text-white">{selectedCard.cardHolder}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Expires</p>
                  <p className="text-white">{selectedCard.expiryDate}</p>
                </div>
              </div>

              {/* Card Indicator Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {mockCards.map((card, index) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === selectedIndex
                        ? "bg-gradient-to-r from-[#62A6BF] to-[#49EB8C] w-5"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Select card ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              aria-label="Next card"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/ManageCards")}
            className="py-2.5 rounded-xl bg-gradient-to-r from-[#62A6BF]/80 via-[#49EB8C]/80 to-[#65E67F]/80
              text-white font-semibold hover:from-[#62A6BF] hover:via-[#49EB8C] hover:to-[#65E67F]
              transition-all duration-300 text-sm"
          >
            Add Card
          </button>
          <button
            type="button"
            onClick={() => navigate("/TransferMoney")}
            className="py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold
              hover:bg-white/20 transition-all duration-300 text-sm"
          >
            Transfer Money
          </button>
        </div>
      </div>
    </section>
  );
}
