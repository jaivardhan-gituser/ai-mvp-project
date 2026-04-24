from flask import Flask, render_template, request
from model import classify_message

app = Flask(__name__)

messages = []

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        msg = request.form['message']
        priority = classify_message(msg)
        
        messages.append({
            'text': msg,
            'priority': priority
        })
    
    return render_template('index.html', messages=messages)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)