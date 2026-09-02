// توليد اسم مشروع عشوائي
function generateRandomName(base) {
    const randomNum = Math.floor(Math.random() * 1000);
    return `${base}-${randomNum}`;
}

// تنسيق الرسائل في الدردشة
function formatChatMessage(message) {
    return `[Trend AI]: ${message}`;
}

export { generateRandomName, formatChatMessage };