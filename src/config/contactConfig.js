/**
 * Contact & WhatsApp Configuration
 * 
 * Centralized contact and WhatsApp numbers for IndiGlobal Healthcare Expo.
 * Update numbers here anytime to reflect across the entire application.
 */

export const CONTACT_CONFIG = {
  // Visitor Trade Pass & Attendee Helpdesk
  visitor: {
    number: '7357590375',
    countryCode: '91',
    display: '+91 73575 90375',
    email: 'info@indiglobalexpo.com',
    deskName: 'Visitor & Trade Pass Desk',
  },

  // Exhibitor Stall Booking & Floor Secretariat
  exhibitor: {
    number: '7357590375',
    countryCode: '91',
    display: '+91 73575 90375',
    email: 'info@indiglobalexpo.com',
    deskName: 'Exhibitor Secretariat',
  },

  // General Expo Secretariat
  general: {
    phone: '+91 73575 90375',
    landline: '+91 73575 90375',
    email: 'info@indiglobalexpo.com',
    visitorEmail: 'info@indiglobalexpo.com',
    exhibitorEmail: 'info@indiglobalexpo.com',
    venue: 'Bangkok, Thailand',
    officeAddress: 'C/O GTTCI, Areness House, 5, Sardar Patel Marg, Diplomatic Enclave, Chanakyapuri, New Delhi - 110021',
  },
};

/**
 * Format raw number with country code for WhatsApp wa.me links
 * @param {'visitor' | 'exhibitor'} type 
 * @returns {string} Digits-only phone string with country code (e.g. '917357590375')
 */
export const getCleanWhatsAppNumber = (type = 'visitor') => {
  const item = CONTACT_CONFIG[type] || CONTACT_CONFIG.visitor;
  const rawNum = String(item.number).replace(/\D/g, '');
  const cc = String(item.countryCode || '91').replace(/\D/g, '');
  
  if (rawNum.startsWith(cc)) {
    return rawNum;
  }
  return `${cc}${rawNum}`;
};

/**
 * Generate a WhatsApp chat URL
 * @param {'visitor' | 'exhibitor'} type - Whether targeting visitor desk or exhibitor desk
 * @param {string} [customMessage] - Optional custom pre-filled message
 * @returns {string} wa.me URL
 */
export const getWhatsAppUrl = (type = 'visitor', customMessage) => {
  const cleanNumber = getCleanWhatsAppNumber(type);

  if (customMessage) {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(customMessage)}`;
  }

  if (type === 'visitor') {
    const defaultVisitorMsg =
      'Hello IndiGlobal Healthcare Expo Team,\n\nI want to register as a Trade Visitor / Healthcare Facility Representative for India-ASEAN Global Confluence 2027.\nPlease share my entry pass details.';
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultVisitorMsg)}`;
  }

  if (type === 'exhibitor') {
    const defaultExhibitorMsg =
      'Hello IndiGlobal Healthcare Expo Team,\n\nI am interested in booking an Exhibitor Stall / Healthcare Facility Pavilion at India-ASEAN Global Confluence 2027.\nPlease share the available booth layouts and pricing.';
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultExhibitorMsg)}`;
  }

  return `https://wa.me/${cleanNumber}`;
};

export default CONTACT_CONFIG;
