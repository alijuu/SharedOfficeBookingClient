import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

function RouteComponent() {
  const [expanded, setExpanded] = useState<number[]>([]);


  const toggle = (index: number) => {
    setExpanded((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>    
      <Typography
        variant="h3"
        align="center"
        fontWeight={700}
        gutterBottom        
        sx={{ mb: 15, fontSize: { xs: 32, sm: 40, md: 48 } }}

        //sx={{ mb: 7 }}
      >
        Frequently Asked Questions
      </Typography>
      <Box display="flex" flexDirection="column" gap={3} mt={10}>
        {faqs.map(({ question, answer }, index) => {
          const isOpen = expanded.includes(index);
          return (
            <Accordion
              key={index}
              expanded={isOpen}
              onChange={() => toggle(index)}
              sx={{
                backgroundColor: '#e0f2fe',
                border: '1px solid #60a5fa',
                boxShadow: '0 2px 6px rgba(96,165,250,0.2)',
                borderRadius: 2,
                '&::before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <AddIcon
                    sx={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      fontSize: 35,
                      fontWeight: 700,
                      color: '#000',
                    }}
                  />
                }
              >
                <Typography
                  sx={{ fontSize: 25, fontWeight: 600, color: '#1e293b' }}
                >
                  {question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: '#475569',
                  lineHeight: 1.5,
                }}
              >
                {answer}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Container>
  );
}

