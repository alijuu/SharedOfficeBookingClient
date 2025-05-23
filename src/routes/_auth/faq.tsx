import React, { useState, CSSProperties } from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/faq')({
  component: RouteComponent,
});

const faqs = [
  {
    question: 'How do I book an office?',
    answer: 'Go to the "Bookings" tab, choose your time slot, and follow the steps to confirm your booking.',
  },
  {
    question: 'Can I cancel a booking?',
    answer: 'Yes, navigate to "Bookings", find your reservation, and click "Cancel".',
  },
  {
    question: 'Is booking free?',
    answer: 'Booking is free for registered users. Premium locations might require a subscription.',
  },
  {
    question: 'Do I need to check in?',
    answer: 'Yes, please check in via the app when you arrive to keep your reservation active.',
  },
  {
    question: 'How can I contact support?',
    answer: 'You can reach support via the "Help" section or by emailing support@example.com.',
  },
];

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: '"Roboto", sans-serif',
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    marginBottom: 70,
    textAlign: 'center',
    
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  faqItem: {
    border: '1px solid #60a5fa', // new lighter blue
    borderRadius: 12,
    boxShadow: '0 2px 6px rgba(96,165,250,0.2)',
    backgroundColor: '#e0f2fe', // new light blue
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  questionButton: {
    width: '100%',
    background: 'none',
    border: 'none',
    padding: '20px 24px',
    textAlign: 'left' as const,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 25,
    fontWeight: 600,
    color: '#1e293b',
  },
  icon: {
    fontSize: 35,
    fontWeight: 700,
    color: '#000000',
    //color: '#2563eb', // vivid blue for icon
    transition: 'transform 0.3s ease',
  },
  answerWrapper: {
    height: '40px', // enough for 2–3 lines of text
    transition: 'opacity 0.3s ease',
    padding: '0 24px 20px',
    fontSize: 20,
    fontWeight: 500,
    color: '#475569',
    lineHeight: 1.5,
    opacity: 0,
    pointerEvents: 'none',
  },
  answerWrapperOpen: {
    opacity: 1,
    pointerEvents: 'auto',
  },
};

function RouteComponent() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Frequently Asked Questions</h1>
      <div style={styles.faqList}>
        {faqs.map(({ question, answer }, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div key={index} style={styles.faqItem}>
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                style={styles.questionButton}
              >
                <span style={styles.questionText}>{question}</span>
                <span
                  style={{
                    ...styles.icon,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                aria-labelledby={`faq-question-${index}`}
                style={{
                  ...styles.answerWrapper,
                  ...(isOpen ? styles.answerWrapperOpen : {}),
                }}
              >
                {answer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
