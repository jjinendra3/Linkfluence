import spacy

# Load spaCy's English language model
nlp = spacy.load("en_core_web_sm")

# Function to check if test text contains content from scraped text
def check_related(scraped_text, test_text):
    # Process the texts using spaCy
    doc1 = nlp(scraped_text)
    doc2 = nlp(test_text)

    # Tokenize the scraped text
    scraped_tokens = set(token.text.lower() for token in doc1 if not token.is_stop and not token.is_punct)

    # Check if any token from the scraped text exists in the test text
    for token in doc2:
        if token.text.lower() in scraped_tokens:
            return True

    # If no matching token is found, return False
    return False

scraped_data = """
"🔒 Unlock Your Cybersecurity Journey 🔒
Embark on a journey to cybersecurity excellence with our comprehensive roadmap! 🚀 Explore the key steps to mastering cybersecurity, from understanding the basics to gaining practical experience and specialized skills. 💼 Whether you're a beginner or seasoned professional, our roadmap will guide you towards success in this dynamic field. 🎓 Don't miss out on this opportunity to level up your cybersecurity game! 
#Cybersecurity #Roadmap #Infosec #LearnAndGrow#CybersecurityJourney #InfosecRoadmap #LearnCybersecurity #SecuritySkills #CyberSecEducation #InfosecCommunity #CyberAwareness #CyberCareer #InfosecTraining #CybersecurityTips #InfosecLearning #SecureFuture#trending
"""

test_data = "cybersecurity"

# Check if test data contains content from scraped data
is_related = check_related(scraped_data, test_data)

if is_related:
    print("The test data is related to the scraped data.")
else:
    print("The test data is not related to the scraped data.")
