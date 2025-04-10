const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "ss",
  alias: ["ssweb"],
  react: "🔰",
  desc: "WEBSITE SCREENSHOT",
  category: "other",
  use: ".ss (url)",
  filename: __filename,
}, 
async (conn, mek, m, {
  from, q, reply
}) => {
  if (!q) return reply("PLEASE GIVE A URL.");

  const isValidUrl = /^https?:\/\/[^\s$.?#].[^\s]*$/gm.test(q);
  if (!isValidUrl) return reply("PLEASE ENTER A VALID URL (include http/https).");

  try {
    const encodedUrl = encodeURIComponent(q);
    const response = await axios.get(`https://apis-nothing.xyz/ssweb?url=${encodedUrl}`);

    if (!response.data || !response.data.screenshotUrl) {
      return reply("FAILED TO GET SCREENSHOT. TRY ANOTHER URL.");
    }

    await conn.sendMessage(from, {
      image: { url: response.data.screenshotUrl },
      caption: "*SSWEB DOWNLOADER*\n\n> *ᴀᴡᴀɪs ᴍᴅ*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363369260614615@newsletter',
          newsletterName: "ᴀᴡᴀɪs ᴍᴅ",
          serverMessageId: 143,
        },
      },
    }, { quoted: m });

  } catch (err) {
    console.error("Screenshot Error:", err.message);
    reply("ERROR FETCHING SCREENSHOT. PLEASE TRY AGAIN LATER.");
  }
});
