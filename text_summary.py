



import re
import math
import requests
from bs4 import BeautifulSoup

#tokenization
def tokenize(text):
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    return [sentence.lower() for sentence in sentences]

#calculationg term frequency
def calculate_tf(sentence):
    words = sentence.split()
    word_count = len(words)
    term_freq = {word: words.count(word) / word_count for word in set(words)}
    return term_freq
# Calculating inverse term frequency
def calculate_idf(sentences):
    idf = {}
    total_sentences = len(sentences)

    for sentence in sentences:
        words = set(sentence.split())
        for word in words:
            idf[word] = idf.get(word, 0) + 1

    return {word: math.log(total_sentences / (count + 1)) for word, count in idf.items()}

# calculating TF-IDF scores
def calculate_tfidf(sentences, idf):
    tfidf_scores = []

    for sentence in sentences:
        tf_scores = calculate_tf(sentence)
        tfidf = sum(tf_scores[word] * idf[word] for word in tf_scores.keys())
        tfidf_scores.append((tfidf, sentence))

    return tfidf_scores




def textrank_summarizer(rawdocs, percentage=30):
    sentences = tokenize(rawdocs)

    idf = calculate_idf(sentences)
    tfidf_scores = calculate_tfidf(sentences, idf)

    ranked_sentences = sorted(tfidf_scores, key=lambda x: x[0], reverse=True)
    select_len = int(len(ranked_sentences) * (percentage / 100))
    selected_sentences = [sent for _, sent in ranked_sentences[:select_len]]

    summary = ' '.join(selected_sentences)

    return summary, rawdocs, len(rawdocs.split(' ')), len(summary.split(' '))

# for extracting text from link which is input from users
def get_text_from_link(link):
    try:
        response = requests.get(link)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        text_content = soup.get_text(separator=' ', strip=True)

        return text_content
    except requests.RequestException as e:
        return f"Error fetching content from link: {e}"
    

def capitalize_first_letter(text):
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    capitalized_sentences = [sentence.capitalize() for sentence in sentences]
    return ' '.join(capitalized_sentences)

def textrank_summarizer(rawdocs, percentage=30):
    sentences = tokenize(rawdocs)

    idf = calculate_idf(sentences)
    tfidf_scores = calculate_tfidf(sentences, idf)

    ranked_sentences = sorted(tfidf_scores, key=lambda x: x[0], reverse=True)
    select_len = int(len(ranked_sentences) * (percentage / 100))
    selected_sentences = [sent for _, sent in ranked_sentences[:select_len]]

    summary = ' '.join(selected_sentences)
    capitalized_summary = capitalize_first_letter(summary)

    return capitalized_summary, rawdocs, len(rawdocs.split(' ')), len(capitalized_summary.split(' '))


