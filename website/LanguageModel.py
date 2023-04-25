import torch
import tensorflow
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import sys, re, logging, string, random



# initialize tokenizer and model from pretrained GPT2 model
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer.add_special_tokens({'pad_token': '[PAD]'})


logging.getLogger("transformers").setLevel(logging.ERROR)


# retrieve the passed parameter
param = sys.argv[1]
param = param.lower()

translator = str.maketrans('', '', string.punctuation)
param = param.translate(translator)


def createSentence(start, combo):
  combo = combo.replace(" ", "")
  for i in range(15): #20 words generated
    for n in range(5):  #5 attempts at letter combo
      test_in = tokenizer.encode(start, return_tensors='pt', padding=True, truncation=True)  #starts with whatever the beginning sentence is
      output = model.generate(test_in, max_length=(i+3), do_sample=True, pad_token_id=tokenizer.eos_token_id, attention_mask=test_in.ne(tokenizer.pad_token_id)) #generates one new word for this sentence
      attempt=tokenizer.decode(output[0], skip_special_tokens=True) #converts back to string sentence
      word_list = attempt.split()  #splits into list of words to get newly added one
      if combo in word_list[-1]:  #if the generated word contains the combo
        start = attempt #add the word to the start sentence
        break #break out of second for loop; move on to next word
      elif n == 4:
        start = attempt
  return start

arr=['The most', 'In', 'As usual', 'Generally speaking', 'In summary', 'Firstly', 'She quickly']
found = random.randint(0, len(arr)-1)

def cleanUp(text, *to_remove):
    pattern = '|'.join(map(re.escape, to_remove))
    cleaned_text = re.sub(pattern, '', text)
    return cleaned_text

generated_sent = createSentence(arr[found], param)


cleaned_sent = cleanUp(generated_sent.strip(),'\n')


print(cleaned_sent)
