import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisaLogo from "../../assets/Visa_Inc._logo.svg";
import MastercardLogo from "../../assets/Mastercard_2019_logo.svg";
import AmexLogo from "../../assets/American_Express_logo_(2018).svg";
import cardService from "../../services/cardService";
import { useUser } from "../../context/UserContext";

const cardLogos = {
  VISA: VisaLogo,
  MASTERCARD: MastercardLogo,
  AMEX: AmexLogo,
  MEEZA: null,
  OTHER: null,
};

export default function CardSection() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchCards = async () => {
    setLoading(true);
    try {
      const cardsData = await cardService.getAllCards();
      setCards(
        cardsData.map((c) => ({
          ...c,
          maskedNumber: "**** **** **** " + c.cardNumber.slice(-4),
          currency: c.currency || "EGP",
        }))
      );
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);


  const handlePrev = () => setSelectedIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  const handleNext = () => setSelectedIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

  const handleSelectReceiving = async () => {
    if (cards.length === 0) return;

    try {
      const cardId = cards[selectedIndex].id;
      await cardService.selectReceivingCard(cardId);
      alert("Card selected for receiving successfully!");
      fetchCards()
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert((error.response?.data?.error || "Failed to select receiving card"));
    }
  };

  const renderCardLogo = (cardType) => {
    const logo = cardLogos[cardType.toUpperCase()] || null;
    if (logo) return <img src={logo} alt={cardType} className="h-8 w-auto object-contain" />;
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[#49EB8C] rounded-full animate-spin" />
          </div>
        ) : cards.length === 0 ? (
          /* NO CARDS STATE */
          <div className="text-center py-8">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-white/20 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No Cards Added Yet</h3>
              <p className="text-white/60 text-sm">
                Add a card to start managing your finances
              </p>
            </div>

            {/* Buttons shown even when no cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => navigate("/ManageCards")}
                className="py-2.5 rounded-xl bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F]
                  text-white font-semibold hover:scale-105 transition-transform duration-300 text-sm"
              >
                Add Your First Card
              </button>

              <button
                type="button"
                onClick={() => navigate("/TransferMoney")}
                disabled
                className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 font-semibold
                  cursor-not-allowed text-sm"
                title="Add a card first to transfer money"
              >
                Transfer Money
              </button>
            </div>
          </div>
        ) : (
          /* CARDS EXIST STATE */
          <>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4 w-full">
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

                <div className="flex-1 bg-white/5 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {renderCardLogo(cards[selectedIndex].cardType)}
                      <span className="text-white/60 text-sm">{cards[selectedIndex].cardType}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs">Balance</p>
                      <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#62A6BF] via-[#49EB8C] to-[#65E67F] font-bold text-xl">
                        {cards[selectedIndex].currency} {new Intl.NumberFormat().format(cards[selectedIndex].balance)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-white/50 text-xs mb-1">Card Number</p>
                      <p className="text-white font-mono">{cards[selectedIndex].maskedNumber}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-1">Card Holder</p>
                      <p className="text-white">{cards[selectedIndex].cardHolder}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-1">Expires</p>
                      <p className="text-white">{cards[selectedIndex].expiryDate}</p>
                    </div>
                    <div>
                      {cards[selectedIndex].isSelectedForReceiving ?
                        <p className="font-bold bg-gradient-to-r from-[#62A6BF] to-[#49EB8C]  text-white rounded text-center px-3 py-1">CURRENT </p>
                        : <p></p>}
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 mt-4">
                    {cards.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === selectedIndex
                          ? "bg-gradient-to-r from-[#62A6BF] to-[#49EB8C] w-5"
                          : "bg-white/30 hover:bg-white/50"
                          }`}
                        aria-label={`Select card ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

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

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                type="button"
                onClick={handleSelectReceiving}
                className="py-2.5 rounded-xl bg-gradient-to-r from-[#62A6BF]/80 via-[#49EB8C]/80 to-[#65E67F]/80
                  text-white font-semibold hover:from-[#62A6BF] hover:via-[#49EB8C] hover:to-[#65E67F]
                  transition-all duration-300 text-sm"
              >
                Choose as Sending/Receiving Card
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
          </>
        )}
      </div>
    </section >
  );
}