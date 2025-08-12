# Exercise 3: Textual analysis of a paragraph

import string

paragraph = """Python is an interpreted, high-level and general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant whitespace."""

# Remove punctuation for word splitting
translator = str.maketrans('', '', string.punctuation)
clean_paragraph = paragraph.translate(translator)

# Sentences count (split by '.', '!', '?')
sentences = [s.strip() for s in paragraph.replace('!', '.').replace('?', '.').split('.') if s.strip()]
sentence_count = len(sentences)

# Words list
words = clean_paragraph.split()
word_count = len(words)

# Unique words
unique_words = set(words)
unique_word_count = len(unique_words)

# Characters count including whitespace
char_count = len(paragraph)

# Non-whitespace characters count
non_whitespace_count = len(paragraph.replace(" ", "").replace("\n", ""))

# Average words per sentence
avg_words_per_sentence = word_count / sentence_count if sentence_count else 0

# Non-unique words count
non_unique_words_count = word_count - unique_word_count

print("Paragraph analysis:")
print(f"- Characters (including spaces): {char_count}")
print(f"- Sentences: {sentence_count}")
print(f"- Words: {word_count}")
print(f"- Unique words: {unique_word_count}")
print(f"- Non-whitespace characters: {non_whitespace_count}")
print(f"- Average words per sentence: {avg_words_per_sentence:.2f}")
print(f"- Non-unique words count: {non_unique_words_count}")
