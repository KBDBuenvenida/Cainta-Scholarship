// Simple scholarship chatbot implementation

// Define responses similar to your Python implementation
const responses = {
  "apply_scholarship": "You can apply by filling out the online application form.",
  "scholarship_requirements": "The requirements include your grades, ID, and application letter.",
  "scholarship_deadline": "The deadline for applications is every July 15.",
  "check_availability": "Yes, the scholarship is currently open.",
  "reapplication_policy": "Yes, you can reapply next semester if rejected.",
  "course_coverage": "The scholarship covers all undergraduate programs.",
  "eligibility_level": "It's open to high school graduates and college students.",
  "document_submission": "Submit your documents via the online portal or in-person.",
  "scholarship_benefits": "The grant provides PHP 5,000 per semester.",
  "grade_requirement": "You must maintain at least a 2.5 GPA.",
  "transferee_eligibility": "Yes, transferees can apply with additional documents.",
  "contact_info": "You can contact the scholarship office at info@scholar.org.",
  "interview_info": "There is a short interview after document review.",
  "renewal_process": "Submit your grades every semester to renew.",
  "failure_policy": "If you fail a subject, you'll be on probation.",
  "application_edit": "Yes, you can edit your application before the deadline."
};

// Keywords to help identify intents (simplified version of ML model)
const intentKeywords = {
  "apply_scholarship": ["apply", "how to apply", "application", "start application", "registration"],
  "scholarship_requirements": ["requirements", "documents", "need", "required", "paperwork", "submit"],
  "scholarship_deadline": ["deadline", "due date", "last day", "when to apply", "until when"],
  "check_availability": ["available", "open", "accepting", "active", "current"],
  "reapplication_policy": ["reapply", "try again", "rejected", "denied", "second chance"],
  "course_coverage": ["course", "program", "degree", "major", "field of study"],
  "eligibility_level": ["eligible", "qualify", "high school", "college", "year level", "freshman"],
  "document_submission": ["submit", "upload", "send", "documents", "papers", "requirements"],
  "scholarship_benefits": ["benefits", "how much", "amount", "cover", "financial support", "grant"],
  "grade_requirement": ["grade", "gpa", "maintain", "academic", "performance"],
  "transferee_eligibility": ["transfer", "transferee", "different school", "change school"],
  "contact_info": ["contact", "email", "phone", "office", "reach"],
  "interview_info": ["interview", "meeting", "talk", "panel"],
  "renewal_process": ["renew", "renewal", "continue", "next semester", "maintain"],
  "failure_policy": ["fail", "failing", "failed", "drop", "probation"],
  "application_edit": ["edit", "change", "modify", "update", "application"]
};

// Preprocess text (similar to Python version)
function preprocessText(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, '');
}

// Simple function to determine intent based on keywords
function determineIntent(text) {
  const cleanText = preprocessText(text);
  
  // Check for greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
  if (greetings.some(greeting => cleanText.includes(greeting))) {
    return "greeting";
  }
  
  // Score each intent based on keyword matches
  const scores = {};
  Object.keys(intentKeywords).forEach(intent => {
    scores[intent] = intentKeywords[intent].reduce((score, keyword) => {
      return score + (cleanText.includes(preprocessText(keyword)) ? 1 : 0);
    }, 0);
  });
  
  // Find max score
  let maxScore = 0;
  let maxIntent = null;
  Object.keys(scores).forEach(intent => {
    if (scores[intent] > maxScore) {
      maxScore = scores[intent];
      maxIntent = intent;
    }
  });
  
  // Return intent or "unknown" if no matches or very low confidence
  return maxScore > 0 ? maxIntent : "unknown";
}

// Main function to get chatbot response
export function getChatbotResponse(userInput) {
  const intent = determineIntent(userInput);
  
  if (intent === "greeting") {
    return "Hello! How can I assist you with your scholarship concern?";
  }
  
  if (intent === "unknown") {
    return "I'm not sure I understand. Could you please ask me about scholarship-related topics?";
  }
  
  return responses[intent];
}
