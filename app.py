import openai
from flask import Flask, request, jsonify

app = Flask(__name__)

# ضع مفتاح API الخاص بك هنا
openai.api_key = "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"

@app.route('/ask', methods=['POST'])
def ask():
    question = request.form['question']
    print(f"Received question: {question}")  # سجل السؤال الوارد
    
    try:
        # استخدام GPT-4 للإجابة على السؤال
        response = openai.Completion.create(
            model="gpt-4",  # يمكنك اختيار النموذج الذي تريد استخدامه
            prompt=question,
            max_tokens=150
        )
        answer = response.choices[0].text.strip()
        print(f"AI Answer: {answer}")  # سجل الإجابة
        return jsonify({'answer': answer})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'answer': "حدث خطأ أثناء معالجة السؤال."})

if __name__ == '__main__':
    app.run(debug=True)
