import requests
from bs4 import BeautifulSoup
import re
from collections import Counter
import math

def get_text_from_link(url):
    try:
        
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')     # fetching HTML content 

        
        paragraphs = soup.find_all('p')
        text = ' '.join([paragraph.get_text() for paragraph in paragraphs]) #extract text 

        return text
    except Exception as e:
        print(f"Error fetching text from link: {e}")
        return None

def process_text(text):
  
    text = re.sub(r'[^a-zA-Z0-9.!@#$%^&*()+-_~`\s]', '', text)  #use of stopwods to remove punctuations

    text = text.lower() 

    return text

def calculate_tfidf(text):
  
    term_frequency = []  # tokenize using td calculation
    for doc in text:
        words = doc.split()
        word_count = Counter(words)
        tf = {word: count / len(words) for word, count in word_count.items()}
        term_frequency.append(tf)

    
    document_frequency = Counter()   
    for tf in term_frequency:
        document_frequency.update(tf.keys())    #idf

    idf = {word: math.log(len(text) / (document_frequency[word] + 1)) for word in document_frequency.keys()}


    tfidf = [{word: tf[word] * idf[word] for word in tf.keys()} for tf in term_frequency]    #tdidf

    return tfidf

def calculate_cosine_similarity(tfidf, query_tfidf):
 
    similarities = [sum(tfidf_i.get(word, 0) * query_tfidf[word] for word in query_tfidf) /
                     (math.sqrt(sum(tfidf_i[word] ** 2 for word in tfidf_i)) *
                      math.sqrt(sum(query_tfidf[word] ** 2 for word in query_tfidf))) for tfidf_i in tfidf]

    return similarities

def get_text_from_summarizer(text, num_sentences=3):
    try:
       
        processed_text = process_text(text)    #final refined text

        
        sentences = re.split(r'\.|\?|\!', processed_text)

      
        tfidf = calculate_tfidf(sentences)

    
        avg_tfidf = [sum(tfidf_i.values()) / len(tfidf_i) if tfidf_i else 0 for tfidf_i in tfidf]

       
        query_tfidf = {word: sum(tfidf_i.get(word, 0) for tfidf_i in tfidf) / len(tfidf) for word in tfidf[0]}


        similarities = calculate_cosine_similarity(tfidf, query_tfidf)

        # selecting top sentences  highest similarity
        selected_sentences = [sentences[i] for i in sorted(range(len(similarities)), key=lambda k: similarities[k], reverse=True)[:num_sentences]]

       
        summarized_text = ' '.join(selected_sentences)

        return summarized_text
    except Exception as e:
        print(f"Error summarizing text: {e}")
        return None

# Example usage:
# url = "https://mofa.gov.np/about-nepal/tourism-in-nepal/"
# text_from_link = get_text_from_link(url)

if text_from_link:
    summarized_text = get_text_from_summarizer(text_from_link)
    print("Original Text:")
    print(text_from_link)
    print(summarized_text)
    print(len.text_from_link)
    print("\nSummarized Text:")
    print(summarized_text)
    print (len.summarized_text)


