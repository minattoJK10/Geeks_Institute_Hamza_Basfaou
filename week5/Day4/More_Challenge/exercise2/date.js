// date.js
function minutesLived(birthdate) {
    const birth = new Date(birthdate);
    const now = new Date();
    const diffMs = now - birth;
    const minutes = Math.floor(diffMs / (1000 * 60));
    return `You have lived ${minutes} minutes.`;
}

module.exports = minutesLived;
