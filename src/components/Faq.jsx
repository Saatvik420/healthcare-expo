import { useState } from 'react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is included in the standard Shell Scheme booth?',
      answer:
        'Standard booths (6 sq.m, 9 sq.m, 12 sq.m) include partition wall panels, carpet flooring, company fascia board, spotlights, electrical connection, a reception counter, and two chairs.',
    },
    {
      question: 'Is Visitor Pass registration free of charge?',
      answer:
        'Yes, pre-registration for verified healthcare, B2B trade, and pharma professionals is complimentary when done online prior to the expo dates.',
    },
    {
      question: 'When will stall allocation letters be issued?',
      answer:
        'Stall allocations are finalized on a first-come, first-served basis following the receipt of the booking advance and registration agreement.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="tag">Inquiries</span>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
                {isOpen && <div className="faq-answer">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
