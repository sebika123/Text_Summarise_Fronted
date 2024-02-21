import re
import math

def split_into_sentences(text):
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    return sentences

def preprocess_sentence(sentence):


    words = re.findall(r'\b\w+\b', sentence.lower()) #tokenize words
    return words

def calculate_tf(word, document):
    
    #  tf = calculate_tf(word, document)
    # idf = calculate_idf(word, documents)
    # return tf * idf


    return document.count(word) / len(document)  #frequency calculation

def calculate_idf(word, documents):
    
    document_count = sum(1 for doc in documents if word in doc)  
    return math.log(len(documents) / (document_count + 1))

def calculate_tfidf(word, document, documents):
    #calculate TF-IDF
    tf = calculate_tf(word, document)
    idf = calculate_idf(word, documents)
    return tf * idf

def generate_summary(text, num_sentences=5):
    sentences = split_into_sentences(text)

    
    unique_words = list(set([word for sentence in sentences for word in preprocess_sentence(sentence)]))

    
    sentence_matrix = [[calculate_tfidf(word, sentence, sentences) for word in unique_words] for sentence in sentences]

    # sentences = split_into_sentences(text)
    sentence_similarity_matrix = [[0] * len(sentences) for _ in range(len(sentences))]

    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i != j:
                sentence_similarity_matrix[i][j] = sum(a * b for a, b in zip(sentence_matrix[i], sentence_matrix[j]))


    scores = [sum(sentence_similarity_matrix[i]) for i in range(len(sentences))]
    ranked_indices = sorted(range(len(scores)), key=lambda k: scores[k])[-num_sentences:]
    ranked_sentences = [sentences[i] for i in ranked_indices]

  
    capitalized_sentences = [sentence.capitalize() for sentence in ranked_sentences]

   
    summary = ' '.join(capitalized_sentences)
    return summary


raw_text = """Your input text goes here. It can have multiple sentences. This is just a sample text."""
summary_result = generate_summary(raw_text)

print("Original Text:")
print(raw_text)
print("\nSummary:")
print(summary_result)
