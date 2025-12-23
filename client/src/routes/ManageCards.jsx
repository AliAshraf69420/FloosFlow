import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddCardForm from "../components/ManageCards/AddCardForm";
import CardListItem from "../components/ManageCards/CardListItem";
import RemoveConfirmPopup from "../components/ManageCards/RemoveConfirmPopup";
import cardService from "../services/cardService";

export default function ManageCardsPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [cardToRemove, setCardToRemove] = useState(null);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsData = await cardService.getAllCards(); // already returns cards array
        setCards(
          cardsData.map((c) => ({
            ...c,
            maskedNumber: "**** **** **** " + c.cardNumber.slice(-4),
            currency: "EGP",
          }))
        );
      } catch (error) {
        console.error(error.response?.data?.error || error.message);
      }
    };
    fetchCards();
  }, []);


  // Add new card
  const handleAddCard = async (newCard) => {
    const payload = {
      cardNumber: newCard.cardNumber,
      cardHolder: newCard.cardHolder,
      balance: parseFloat(newCard.balance) || 0,
      expiryDate: newCard.expiryDate,
      cvv: newCard.cvv,
      cardType: newCard.cardType,
    };

    try {
      const response = await cardService.addCard(payload);
      const savedCard = response?.data?.card;


      setCards((prev) => [
        ...prev,
        {
          ...savedCard,
          maskedNumber: "**** **** **** " + savedCard.cardNumber.slice(-4),
          currency: "EGP",
        },
      ]);

      setShowAddForm(false);

      return savedCard; // return so child can show success
    } catch (error) {
      throw error;
    }
  };


  const handleRemoveCard = (cardId) => {
    const card = cards.find((c) => c.id === cardId);
    setCardToRemove(card);
  };

  const confirmRemove = async () => {
    if (!cardToRemove) return;

    try {
      await cardService.deleteCard(cardToRemove.id);
      setCards((prev) => prev.filter((c) => c.id !== cardToRemove.id));
      setCardToRemove(null);
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Failed to remove card");
    }
  };

  return (
    <main className="flex-grow pt-28 px-4 pb-10" role="main" aria-labelledby="manage-cards-heading">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 id="manage-cards-heading" className="text-2xl font-semibold text-white">
            Manage Cards
          </h1>
          <button
            onClick={() => navigate("/Home")}
            className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 text-sm"
          >
            Back to Home
          </button>
        </div>

        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full mb-6 py-4 rounded-xl border-2 border-dashed border-white/30 text-white/70 font-medium hover:border-[#49EB8C]/50 hover:text-[#49EB8C] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Card
          </button>
        ) : (
          <div className="mb-6 flex justify-center">
            <AddCardForm onAdd={handleAddCard} onCancel={() => setShowAddForm(false)} />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white/80 mb-4">Your Cards</h2>
          {cards.length === 0 ? (
            <div className="ff-card-Transfer p-8 text-center">
              <p className="text-white/60">No cards added yet.</p>
            </div>
          ) : (
            cards.map((card) => (
              <CardListItem
                key={card.id}
                card={{ ...card, cardNumber: card.maskedNumber }}
                onRemove={handleRemoveCard}
              />
            ))
          )}
        </div>
      </div>

      <RemoveConfirmPopup
        isOpen={!!cardToRemove}
        card={cardToRemove}
        onConfirm={confirmRemove}
        onCancel={() => setCardToRemove(null)}
      />
    </main>
  );
}
