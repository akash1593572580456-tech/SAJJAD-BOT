const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
config: {
name: "inforana",
aliases: ["rana", "ranainfo"],
version: "1.0",
author: "TONMOY",
countDown: 5,
role: 0,
shortDescription: "Rana Information",
longDescription: "Show Rana Information With Video",
category: "info",
guide: "{pn}"
},

onStart: async function ({ api, event }) {
	try {
		const videoUrl = "https://files.catbox.moe/hs9a4y.mp4";

		const tempDir = path.join(__dirname, "tmp");
		if (!fs.existsSync(tempDir))
			fs.mkdirSync(tempDir, { recursive: true });

		const videoPath = path.join(tempDir, "rana_info.mp4");

		const video = await axios.get(videoUrl, {
			responseType: "arraybuffer"
		});

		fs.writeFileSync(videoPath, Buffer.from(video.data));

		const msg = `

╔══════════════════════╗
👑 𝐑𝐀𝐍𝐀 𝐈𝐍𝐅𝐎 👑
╚══════════════════════╝

👤 𝐍𝐚𝐦𝐞      : 𓆩⟡ 𝐑𝐀𝐍𝐀 ⟡𓆪
👑 𝐍𝐢𝐜𝐤      : 𝗥𝗔𝗡𝗔 𝗕𝗢𝗦𝗦 ⚡
🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : 𝐌𝐀𝐋𝐄 🔥

━━━━━━━━━━━━━━━━━━

🟢 𝐒𝐭𝐚𝐭𝐮𝐬    : 𝗢𝗡𝗟𝗜𝗡𝗘
⚡ 𝐏𝐨𝐰𝐞𝐫     : 𝗨𝗡𝗟𝗜𝗠𝗜𝗧𝗘𝗗
👑 𝐏𝐨𝐬𝐢𝐭𝐢𝐨𝐧 : 𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑

━━━━━━━━━━━━━━━━━━

🌪️ 𝗞𝗶𝗻𝗴 𝗢𝗳 𝗧𝗵𝗲 𝗚𝗿𝗼𝘂𝗽
🔥 𝗥𝗲𝘀𝗽𝗲𝗰𝘁 𝗘𝘃𝗲𝗿𝘆𝗼𝗻𝗲
❤️ 𝗦𝘁𝗮𝘆 𝗛𝗮𝗽𝗽𝘆

━━━━━━━━━━━━━━━━━━

💬 "𝗗𝗼𝗻'𝘁 𝗦𝗵𝗼𝘄 𝗬𝗼𝘂𝗿 𝗣𝗼𝘄𝗲𝗿,
𝗦𝗵𝗼𝘄 𝗬𝗼𝘂𝗿 𝗖𝗹𝗮𝘀𝘀"

━━━━━━━━━━━━━━━━━━

👑 𝗥𝗔𝗡𝗔 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 👑
`;

		await api.sendMessage(
			{
				body: msg,
				attachment: fs.createReadStream(videoPath)
			},
			event.threadID,
			() => {
				try {
					if (fs.existsSync(videoPath))
						fs.unlinkSync(videoPath);
				} catch (e) {}
			},
			event.messageID
		);

		api.setMessageReaction(
			"👑",
			event.messageID,
			() => {},
			true
		);

	} catch (err) {
		console.error("InfoRana Error:", err);

		api.sendMessage(
			"❌ Error Loading Rana Information.",
			event.threadID,
			event.messageID
		);
	}
}

};
