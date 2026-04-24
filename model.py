def classify_message(msg):
    msg = msg.lower()
    
    if "help" in msg or "emergency" in msg or "accident" in msg:
        return "HIGH 🚨"
    elif "urgent" in msg:
        return "MEDIUM ⚠️"
    else:
        return "LOW 💬"