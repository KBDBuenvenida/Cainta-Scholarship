/**
 * Scholarship Chatbot Implementation - Based on the provided dataset
 */

// English stopwords
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "be", "been", "being",
  "in", "on", "at", "to", "for", "with", "by", "about", "against", "between", "into", "through",
  "during", "before", "after", "above", "below", "from", "up", "down", "of", "off", "over", "under",
  "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any",
  "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own",
  "same", "so", "than", "too", "very", "can", "will", "just", "should", "now", "do", "does", "did"
]);

// Dataset of scholarship questions, intents, and answers
const SCHOLARSHIP_DATASET = [
  // Submit Documents intent
  {
    "intent": "submit_documents",
    "questions": [
      "Where do I need to submit the documents?",
      "Where can I turn in the required documents?",
      "Where should I upload my scholarship documents?",
      "Where exactly do I submit the files?",
      "Where is the document submission done?",
      "Where must the application documents be sent?",
      "How do I submit my documents?",
      "Through which platform do we send the documents?",
      "Where are we supposed to upload the documents?",
      "Where do I pass the documents for the application?",
      "What is the correct way to submit the documents?",
      "Where can the scholarship documents be turned in?",
      "Is there a platform where I need to upload the documents?",
      "What's the proper place to submit all required documents?",
      "Where should I send the documents for processing?",
      "Where do we hand over the application documents?",
      "Is there an online portal for document submission?",
      "Where should I deliver my documents for scholarship?",
      "Where is the document submission point?",
      "Where exactly should I submit the application papers?",
      "How can I send my documents?",
      "Where should I upload my application papers?",
      "What's the procedure for submitting documents?",
      "Where do I turn in the scholarship documents?",
      "Can I submit the requirements online?"
    ],
    "answer": "You can submit all the required documents directly through the application platform. Just make sure everything is complete and clearly uploaded so we can process it without delays."
  },
  
  // Submission Deadline intent
  {
    "intent": "submission_deadline",
    "questions": [
      "When does the scholarship application open and close?",
      "What is the timeframe for submitting our documents?",
      "When can I start submitting my scholarship papers?",
      "What are the submission start and end dates?",
      "When should I submit my scholarship application?",
      "What's the deadline to turn in the documents?",
      "When does the submission window open?",
      "By what date must we submit the papers?",
      "How long is the submission period for the scholarship?",
      "What are the key dates for submission?",
      "When is the scholarship submission period?",
      "Can you tell me the submission deadline?",
      "What are the start and end dates for applications?",
      "When do applications begin and end?",
      "What's the last day to apply for the scholarship?",
      "What is the full duration of the submission period?",
      "When can I begin and finish my application?",
      "How much time do we have to submit the forms?",
      "What are the opening and closing dates for submission?",
      "When does the submission schedule start and stop?",
      "When is the last day to apply?",
      "What's the scholarship deadline?",
      "By what date should I submit the form?",
      "Until when is the submission accepted?",
      "What's the cut-off for scholarship application?"
    ],
    "answer": "The submission period for the scholarship starts on June 1 and ends on July 31. We'll also post updates if there are any changes to the schedule."
  },
  
  // Required Documents intent
  {
    "intent": "required_documents",
    "questions": [
      "Can you list the documents I need to submit?",
      "What are the necessary documents for application?",
      "Which files are needed for the scholarship?",
      "What paperwork should I prepare for the application?",
      "What items are required for submission?",
      "What must I include in my scholarship documents?",
      "Which documents are mandatory?",
      "What are the required attachments?",
      "What supporting documents do I need?",
      "Can you name the documents needed?",
      "What kind of documents should I submit?",
      "What are the essential files for the application?",
      "Which records should I upload?",
      "What materials are required?",
      "Could you provide a list of required documents?",
      "What information should be in my submission?",
      "What documents do I need to upload?",
      "What are the prerequisites for documentation?",
      "What specific documents should I include?",
      "What is the document checklist for the application?",
      "Which papers are required?",
      "What documents do I need?",
      "List of required scholarship files?",
      "What should I prepare for the application?",
      "Do I need an ID or transcript to apply?"
    ],
    "answer": "You'll need to prepare and upload the following: Latest School Registration Form, Official Receipt (proof of payment), School ID, Summary of Grades or Report Card, Statement of Purpose, and a Portfolio. Make sure all files are clear and updated."
  },
  
  // Grade Requirement intent
  {
    "intent": "grade_requirement",
    "questions": [
      "What is the minimum grade required to apply?",
      "What are the grade requirements for eligibility?",
      "What GWA should I have to qualify?",
      "What grades do I need for this scholarship?",
      "What's the required academic standing?",
      "How high should my grades be?",
      "What's the lowest acceptable grade?",
      "Do I need a certain GWA to be eligible?",
      "What grade threshold must I meet?",
      "What academic qualifications are required?",
      "Can I apply with a GWA below 85?",
      "Is there a grade cut-off for applicants?",
      "What marks do I need to qualify?",
      "How good should my grades be?",
      "What's the GPA requirement?",
      "What is the qualifying GWA?",
      "Are there grade standards for applying?",
      "What school performance is expected?",
      "Is 2.0 allowed for college students?",
      "What's the required grade range?",
      "What GWA is required?",
      "Do I need a high grade to qualify?",
      "What's the GPA cutoff?",
      "Can I apply with a 2.0 average?",
      "Are there grade requirements for eligibility?"
    ],
    "answer": "For Senior High School, you'll need at least a GWA of 85. For College students, your grade should not go above 2.0 to stay eligible."
  },
  
  // Renewal Schedule intent
  {
    "intent": "renewal_schedule",
    "questions": [
      "When is the scholarship renewal period?",
      "When do I need to renew my scholarship?",
      "Is there a renewal schedule?",
      "What month is scholarship renewal?",
      "When should I renew my scholarship?",
      "When do renewals usually happen?",
      "Can I know the renewal timeline?",
      "When will renewal start?",
      "When does the renewal window open?",
      "When can students renew their scholarship?",
      "What's the time frame for renewal?",
      "Do you have a renewal calendar?",
      "Is June the month for renewal?",
      "When does scholarship renewal take place?",
      "When is the deadline to renew?",
      "What is the usual renewal period?",
      "Is there a fixed schedule for renewal?",
      "What dates apply for renewal?",
      "When are renewals accepted?",
      "Is the renewal period announced yet?",
      "When should I renew my scholarship?",
      "Is there a timeline for scholarship renewal?",
      "When does renewal happen?",
      "How often do I need to renew?",
      "Is renewal every semester or annually?"
    ],
    "answer": "There's no official announcement yet, but renewals are usually done from June to July 31. We'll post updates once the final schedule is confirmed."
  },
  
  // Payout Schedule intent
  {
    "intent": "payout_schedule",
    "questions": [
      "When will the scholarship payout be released?",
      "Is there a payout schedule available?",
      "Do we know the payout date yet?",
      "When can we expect the payout?",
      "Is the payout finalized yet?",
      "Any news on the scholarship payout?",
      "When is the release of scholarship funds?",
      "When will I receive the scholarship money?",
      "What is the date of the payout?",
      "When is the disbursement?",
      "Can you tell me when payout happens?",
      "When is the expected payout period?",
      "Has the payout schedule been confirmed?",
      "When does the scholarship get paid?",
      "Is there a payout announcement?",
      "When are scholarship funds given out?",
      "Do we know when the scholarship will be released?",
      "When should I expect the payout?",
      "Any update on the payout release?",
      "Is payout already scheduled?",
      "When is the allowance released?",
      "When will I receive the funds?",
      "Is there a payout schedule?",
      "When does the scholarship money arrive?",
      "How long does the payout take?"
    ],
    "answer": "The exact payout date hasn't been finalized yet. We'll make an announcement as soon as the schedule is available."
  },
  
  // Dismissal Reasons intent
  {
    "intent": "dismissal_reasons",
    "questions": [
      "What could cause someone to lose their scholarship?",
      "What are the grounds for scholarship dismissal?",
      "What can make me lose the scholarship?",
      "What are possible reasons for termination?",
      "Why would a scholarship be revoked?",
      "What might result in losing my scholarship?",
      "Can you be dismissed from the scholarship?",
      "What causes ineligibility to continue?",
      "What are the risks of being removed from the program?",
      "How can a scholar lose the grant?",
      "Why might a student be disqualified?",
      "What are the disqualification criteria?",
      "What would void my scholarship?",
      "What behavior leads to dismissal?",
      "Can missing renewal lose my scholarship?",
      "Is non-renewal a reason for dismissal?",
      "How do students lose their grants?",
      "What are the rules for scholarship retention?",
      "Is failing to renew a dismissal reason?",
      "Can I be removed from the scholarship program?",
      "What can disqualify me from the scholarship?",
      "Why would someone get dismissed?",
      "Are there rules that could remove my scholarship?",
      "Can misconduct cause dismissal?",
      "Is failing to renew a reason to lose it?"
    ],
    "answer": "Right now, the main reason would be not renewing the scholarship during the allowed period. So be sure to complete the renewal when it opens."
  },
  
  // Failing Grade Consequence intent
  {
    "intent": "failing_grade_consequence",
    "questions": [
      "What happens if I fail one subject?",
      "Am I still qualified if I have a failing grade?",
      "Can I have a failing grade and keep the scholarship?",
      "Will I lose the scholarship if I fail?",
      "Is one failing grade allowed?",
      "How many failing grades are tolerated?",
      "What's the penalty for failing a subject?",
      "Do failing marks affect eligibility?",
      "Will one failed subject disqualify me?",
      "What's the limit on failed grades?",
      "Can failing one subject remove my grant?",
      "Is a single failing grade acceptable?",
      "What's the consequence of failing a subject?",
      "What happens with more than one failed grade?",
      "Will my scholarship be revoked if I fail twice?",
      "Is there a warning for failing grades?",
      "Does failure in class affect my scholarship?",
      "How does failing affect my scholarship status?",
      "What's the grade failure policy?",
      "Is it okay to fail one subject under the scholarship?",
      "Can I still keep the scholarship if I fail one subject?",
      "What happens if I get a failing grade?",
      "Do I lose my scholarship if I fail?",
      "How many fails are tolerated?",
      "Is one failure okay for scholars?"
    ],
    "answer": "You're allowed to have one failing grade. If you go over that, your scholarship might be revoked depending on the situation."
  },
  
  // Incomplete Grades Handling intent
  {
    "intent": "incomplete_grades_handling",
    "questions": [
      "What if I don't have complete grades yet?",
      "Can I still apply if my grades are incomplete?",
      "What should I do if grades aren't finalized?",
      "How do I proceed if some grades are missing?",
      "Can I submit partial grades?",
      "Is it okay to submit prelim and midterm grades only?",
      "What do I do if finals aren't out yet?",
      "What if my final grades aren't posted?",
      "How can I submit if I don't have full grades?",
      "Can I follow up with missing grades later?",
      "Am I allowed to send incomplete grades?",
      "Is partial grade submission accepted?",
      "Can I update grades after applying?",
      "Will you accept my midterms for now?",
      "Can I send prelim results first?",
      "Is it allowed to apply with grades in progress?",
      "Do I need to wait for final grades?",
      "What are the options if I lack final grades?",
      "Can I submit what's available now?",
      "What's the process if my grades aren't all ready?",
      "Can I submit grades that are incomplete?",
      "What if my grades aren't final yet?",
      "Is submission allowed with INCs?",
      "Can I apply with partial grades?",
      "How should I handle incomplete grades?"
    ],
    "answer": "You can submit your prelim and midterm grades for now. Then just follow up and send the final grades once they're available."
  }
];

// Greeting intent data
const GREETINGS = {
  "intent": "greeting",
  "questions": [
    "hi", "hello", "hey", "good morning", "good afternoon", 
    "good evening", "greetings", "how are you", "what's up"
  ],
  "answers": [
    "Hello! How can I help you with scholarship questions today?",
    "Hi there! Feel free to ask me any questions about the scholarship program.",
    "Hello! I'm here to assist with your scholarship inquiries.",
    "Greetings! How may I help with your scholarship concerns today?",
    "Hello! What would you like to know about the scholarship program?"
  ]
};

/**
 * Text Preprocessing
 */
function preprocessText(text) {
  if (!text) return "";
  
  // Convert to lowercase
  text = text.toLowerCase().trim();
  
  // Remove special characters except apostrophes
  text = text.replace(/[^\w\s']|_/g, " ");
  
  // Replace multiple spaces with a single space
  text = text.replace(/\s+/g, " ");
  
  // Remove stopwords for more efficient matching
  const words = text.split(" ");
  const filteredWords = words.filter(word => !STOPWORDS.has(word) && word.length > 1);
  
  return filteredWords.join(" ").trim() || text.trim();
}

/**
 * Compute similarity score between two texts
 * Uses a combination of word overlap and character n-gram analysis
 */
function computeSimilarity(userText, referenceText) {
  const processedUserText = preprocessText(userText);
  const processedRefText = preprocessText(referenceText);
  
  if (!processedUserText || !processedRefText) return 0;
  
  // Split into words
  const userWords = processedUserText.split(" ");
  const refWords = processedRefText.split(" ");
  
  // Count exact word matches
  let matchCount = 0;
  for (const word of userWords) {
    if (word.length > 1 && refWords.includes(word)) {
      matchCount += 1;
    }
  }
  
  // Weight based on coverage of user's question
  const coverage = matchCount / userWords.length;
  
  // Weight based on reference text coverage
  const refCoverage = matchCount / refWords.length;
  
  // Combine for final score with emphasis on user question coverage
  return (coverage * 0.7) + (refCoverage * 0.3);
}

/**
 * Find the best matching intent for a given user query
 */
function findBestIntent(userQuery) {
  // Check for greetings first
  if (GREETINGS.questions.some(g => userQuery.toLowerCase().includes(g))) {
    return {
      intent: "greeting",
      confidence: 1.0,
      answer: GREETINGS.answers[Math.floor(Math.random() * GREETINGS.answers.length)]
    };
  }
  
  let bestIntent = null;
  let highestScore = 0;
  let bestMatchQuestion = "";
  
  // Compare against all intents and their questions
  for (const intentData of SCHOLARSHIP_DATASET) {
    for (const question of intentData.questions) {
      const score = computeSimilarity(userQuery, question);
      
      if (score > highestScore) {
        highestScore = score;
        bestIntent = intentData;
        bestMatchQuestion = question;
      }
    }
  }
  
  // Confidence thresholds
  if (highestScore > 0.5) {
    return {
      intent: bestIntent.intent,
      confidence: highestScore,
      answer: bestIntent.answer
    };
  } else if (highestScore > 0.3) {
    return {
      intent: bestIntent.intent,
      confidence: highestScore,
      answer: bestIntent.answer,
      uncertain: true
    };
  }
  
  // No good match found
  return { 
    intent: "unknown",
    confidence: 0,
    answer: "I'm not sure I understand your question about scholarships. Could you please rephrase or ask specifically about document submission, deadlines, grade requirements, renewal, or payout schedules?"
  };
}

/**
 * Main chatbot response function
 */
export function getChatbotResponse(userInput) {
  console.log("Processing user query:", userInput);
  
  // Handle empty or very short queries
  if (!userInput || userInput.trim().length < 3) {
    return "Could you please provide more details in your question?";
  }
  
  try {
    // Find the best matching intent
    const result = findBestIntent(userInput);
    
    // Log the result for debugging purposes
    console.log("Matched intent:", result.intent, "with confidence:", result.confidence);
    
    // Return the appropriate response
    if (result.uncertain) {
      return "I think you're asking about " + result.intent.replace(/_/g, " ") + ". " + result.answer;
    }
    
    return result.answer;
    
  } catch (error) {
    console.error("Error in chatbot processing:", error);
    return "I encountered an error while processing your question. Please try asking in a different way.";
  }
}
