import pandas as pd
import torch
import tensorflow
from transformers import GPT2LMHeadModel, GPT2Tokenizer

data = pd.read_csv('website\static\sentencedataset.csv')
#print(data)

# initialize tokenizer and model from pretrained GPT2 model
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')
input = data['Sentences']

lines = []
for row in data:
  sentence = data["Sentences"]
  for line in sentence:
    lines.append(line)

lines = lines[:-614]  #shrinks size to 1024

def createSentence(start, combo):
  for i in range(20): #10 words generated
    for n in range(5):  #6 attempts at letter combo
      test_in = tokenizer.encode(start, return_tensors='pt')  #starts with whatever the beginning sentence is
      #print('START: '+start)
      output = model.generate(test_in, max_length=(i+3), do_sample=True) #generates one new word for this sentence
      attempt=tokenizer.decode(output[0], skip_special_tokens=True) #converts back to string sentence
      word_list = attempt.split()  #splits into list of words to get newly added one
      #print('generated: '+word_list[-1])
      if combo in word_list[-1]:  #if the generated word contains the combo
        #print('match')
        start = attempt #add the word to the start sentence
        break #break out of second for loop; move on to next word
      elif n == 5:
        start = attempt
  return start

test3 = 'Happy birthday to'

#generated_sent = createSentence(test3, 'ou')
#print(generated_sent)

def my_value():
  return "Hello, world!"