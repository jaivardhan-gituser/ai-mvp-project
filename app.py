from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

messages = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send():
    data = request.json
    text = data['message']

    priority = "high" if "help" in text.lower() else "normal"

    messages.append({
        "text": text,
        "priority": priority,
        "type": "text"
    })

    return "OK"

@app.route('/send-location', methods=['POST'])
def send_location():
    data = request.json

    print("📍 LOCATION RECEIVED:", data)

    messages.append({
        "text": f"{data['lat']},{data['lon']}",
        "priority": "high",
        "type": "location"
    })

    return "OK"

@app.route('/messages')
def get_messages():
    return jsonify(messages)

if __name__ == "__main__":
    print("Starting server...")
    app.run(host="0.0.0.0", port=5001, debug=True)