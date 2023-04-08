import pandas as pd
import torch
import tensorflow
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import sys, re, logging

data = pd.read_csv('website\static\sentencedataset.csv')
#print(data)

# initialize tokenizer and model from pretrained GPT2 model
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer.add_special_tokens({'pad_token': '[PAD]'})
input = data['Sentences']

logging.getLogger("transformers").setLevel(logging.ERROR)

lines = []
for row in data:
  sentence = data["Sentences"]
  for line in sentence:
    lines.append(line)

lines = lines[:-614]  #shrinks size to 1024
param = sys.argv[1]

def createSentence(start, combo):
  for i in range(20): #20 words generated
    for n in range(5):  #6 attempts at letter combo
      test_in = tokenizer.encode(start, return_tensors='pt', padding=True, truncation=True)  #starts with whatever the beginning sentence is
      output = model.generate(test_in, max_length=(i+3), do_sample=True, pad_token_id=tokenizer.eos_token_id, attention_mask=test_in.ne(tokenizer.pad_token_id)) #generates one new word for this sentence
      attempt=tokenizer.decode(output[0], skip_special_tokens=True) #converts back to string sentence
      word_list = attempt.split()  #splits into list of words to get newly added one
      if combo in word_list[-1]:  #if the generated word contains the combo
        start = attempt #add the word to the start sentence
        break #break out of second for loop; move on to next word
      elif n == 5:
        start = attempt
  return start

test3 = 'Happy'
"""
def clean_up(text):
    # Replace all possible newline characters with spaces
    cleaned_text = re.sub(r'[\n\r\f\v]', ' ', text)
    # Replace all consecutive spaces with a single space
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
    cleaned_text = re.sub(r'[^\x20-\x7E]', '', cleaned_text)

    # Strip leading/trailing spaces
    cleaned_text = cleaned_text.strip()
    return cleaned_text


generated_sent = createSentence(test3, param)
clean_text = clean_up(generated_sent)
#generated_sent = generated_sent.replace('"', '') # Remove quotes
#generated_sent = generated_sent.replace('\r', ' ') # Remove \r
#generated_sent = generated_sent.replace('\n', ' ') # Remove \n
#generated_sent = generated_sent.replace('\r\n', '')
clean_text = clean_text.replace('\r\n', ' ').replace('\n', ' ').replace('\r', ' ')
"""
def cleanUp(text, *to_remove):
    pattern = '|'.join(map(re.escape, to_remove))
    cleaned_text = re.sub(pattern, '', text)
    return cleaned_text
generated_sent = createSentence(test3, 'ou')


cleaned_sent = cleanUp(generated_sent.strip(), '\\', '"', '\r', '\n')
print(cleaned_sent)
