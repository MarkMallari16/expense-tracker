import React, { useState, useEffect } from 'react';
import { isThisWeek, isThisMonth, isThisYear } from 'date-fns';

function CardStack({ expenses }) {
  // Define initial state for cards
  const [cards, setCards] = useState([
    {
      id: 1,
      content: 'Weekly',
      value: '0',
      bgColor: ['bg-[#192655]', 'bg-[#2E3D88]', 'bg-[#3F4EA9]'],
      textColor: ['text-white', 'text-gray-300', 'text-gray-400'],
      currentBgColor: 'bg-[#192655]',
      currentTextColor: 'text-white',
    },
    {
      id: 2,
      content: 'Monthly',
      value: '0',
      bgColor: ['bg-[#192655]', 'bg-[#2E3D88]', 'bg-[#3F4EA9]'],
      textColor: ['text-white', 'text-gray-300', 'text-gray-400'],
      currentBgColor: 'bg-[#192655]',
      currentTextColor: 'text-white',
    },
    {
      id: 3,
      content: 'Yearly',
      value: '0',
      bgColor: ['bg-[#192655]', 'bg-[#2E3D88]', 'bg-[#3F4EA9]'],
      textColor: ['text-white', 'text-gray-300', 'text-gray-400'],
      currentBgColor: 'bg-[#192655]',
      currentTextColor: 'text-white',
    },
  ]);

  useEffect(() => {
    const weeklyTotal = expenses.reduce((acc, curr) => {
      return isThisWeek(new Date(curr.created_at)) ? acc + curr.price : acc;
    }, 0);

    const monthlyTotal = expenses.reduce((acc, curr) => {
      return isThisMonth(new Date(curr.created_at)) ? acc + curr.price : acc;
    }, 0);

    const yearlyTotal = expenses.reduce((acc, curr) => {
      return isThisYear(new Date(curr.created_at)) ? acc + curr.price : acc;
    }, 0);

    setCards((prevCards) => {
      return prevCards.map((card, index) => {
        let updatedValue = card.value;
        switch (card.content) {
          case 'Weekly':
            updatedValue = weeklyTotal.toLocaleString();
            break;
          case 'Monthly':
            updatedValue = monthlyTotal.toLocaleString();
            break;
          case 'Yearly':
            updatedValue = yearlyTotal.toLocaleString();
            break;
          default:
        }
        return {
          ...card,
          value: updatedValue,
          currentBgColor: card.bgColor[index % card.bgColor.length],
          currentTextColor: card.textColor[index % card.textColor.length],
        };
      });
    });
  }, [expenses]);

  const handleClick = (cardId) => {
    setCards((prevCards) => {
      const cardIndex = prevCards.findIndex((card) => card.id === cardId);
      const clickedCard = prevCards[cardIndex];
      const newCards = prevCards.filter((card) => card.id !== cardId);
      newCards.unshift(clickedCard);
      return newCards.map((card, index) => {
        return {
          ...card,
          currentBgColor: card.bgColor[index % card.bgColor.length],
          currentTextColor: card.textColor[index % card.textColor.length],
        };
      });
    });
  };

  const getStyle = (index) => ({
    transform: `translateY(${index * -21}px) translateX(${index * 44}px)`,
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
            if (index > 0) {
              e.currentTarget.style.transform += ' translateY(-10px)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = getStyle(index).transform;
          }}
          className={`absolute w-5/6 h-44 ${card.currentBgColor} ${card.currentTextColor} shadow-lg rounded-lg p-4 flex flex-col cursor-pointer`}
          style={getStyle(index)}
        >
          <div className="text-lg font-semibold" style={{ position: 'absolute', top: '0.2rem', left: '0.8rem' }}>
            {card.content}
          </div>
          <div className="flex-grow flex items-center justify-center">
            <div className="text-6xl font-bold">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardStack;
