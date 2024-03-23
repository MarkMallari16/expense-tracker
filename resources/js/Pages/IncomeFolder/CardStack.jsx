import React, { useState } from 'react';

const cardData = [
  {
    id: 1,
    content: 'Weekly Income',
    value: '15,000',
    bgColor: ['bg-[#192655]', 'bg-[#2E3D88]', 'bg-[#3F4EA9]'], // Dark, Light, Lighter
    textColor: ['text-white', 'text-gray-300', 'text-gray-400'], // Dark, Light, Lighter text colors
  },
  {
    id: 2,
    content: 'Monthly Income',
    value: '25,000',
    bgColor: ['bg-[#192655]', 'bg-[#2E3D88]', 'bg-[#3F4EA9]'],
    textColor: ['text-white', 'text-gray-300', 'text-gray-400'],
  },
  {
    id: 3,
    content: 'Yearly Income',
    value: '55,000',
    bgColor: ['bg-[#192655]', 'bg-[#2E3D88]', 'bg-[#3F4EA9]'],
    textColor: ['text-white', 'text-gray-300', 'text-gray-400'],
  },
];

function CardStack() {
  const [cards, setCards] = useState(cardData.map((card, index) => ({
    ...card,
    currentBgColor: card.bgColor[index], // Adjust initial bg color based on position
    currentTextColor: card.textColor[index], // Adjust initial text color based on position
  })));

  const handleClick = (cardId) => {
    setCards(prevCards => {
      const cardIndex = prevCards.findIndex(card => card.id === cardId);
      const clickedCard = {
        ...prevCards[cardIndex],
        currentBgColor: prevCards[cardIndex].bgColor[0], // Dark color for clicked
        currentTextColor: prevCards[cardIndex].textColor[0], // Dark text color for clicked
      };
      // Move clicked card to front and adjust others accordingly
      const newCardsArray = prevCards.filter(card => card.id !== cardId)
                           .map((card, index) => ({
                             ...card,
                             currentBgColor: card.bgColor[0], // Reset to dark as they move to the back
                             currentTextColor: card.textColor[0], // Reset text color as well
                           }));
      newCardsArray.unshift(clickedCard);
      return newCardsArray.map((card, index) => ({
        ...card,
        currentBgColor: card.bgColor[index], // Adjust colors again based on new position
        currentTextColor: card.textColor[index],
      }));
    });
  };

  const getStyle = (index, isHovered) => ({
    transform: `translateY(${index * -21}px) translateX(${index * 44}px) ${isHovered && index > 0 ? 'translateY(-10px)' : ''}`,
    zIndex: cards.length - index,
    transition: 'transform 0.3s ease',
  });

  return (
    <div className="relative flex items-end justify-start h-full">
      {cards.map((card, index) => (
        <div
          key={card.id}
          onClick={() => handleClick(card.id)}
          onMouseEnter={(e) => {
            if (index > 0) { // Apply hover effect only to 2nd and 3rd cards
              e.currentTarget.style.transform += ' translateY(-10px)';
            }
          }}
          onMouseLeave={(e) => {
            // Reset transform on mouse leave
            e.currentTarget.style.transform = getStyle(index, false).transform;
          }}
          className={`absolute w-5/6 h-44 ${card.currentBgColor} ${card.currentTextColor} shadow-lg rounded-lg p-4 flex flex-col cursor-pointer`}
          style={getStyle(index, false)}
        >
          <div className="text-lg font-semibold" style={{ position: 'absolute', top: '0.2rem', left: '0.8rem' }}>{card.content}</div>
          <div className="flex-grow flex items-center justify-center">
            <div className="text-6xl font-bold">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardStack;
