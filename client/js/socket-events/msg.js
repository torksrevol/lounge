"use strict";

const $ = require("jquery");
const socket = require("../socket");
const render = require("../render");
const chat = $("#chat");
const templates = require("../../views");

socket.on("msg", function(data) {
	let target = "#chan-" + data.chan;
	let chan = chat.find(target);

	// Display received notices and errors in currently active channel,
	// if the actual target is the network lobby.
	// Reloading the page will put them back into the lobby window.
	if ((data.msg.type === "error" || data.msg.type === "notice") && chan.hasClass("lobby")) {
		data.chan = chat.find(".active").data("id");
		target = "#chan-" + data.chan;
		chan = chat.find(target);
	}

	const msg = render.buildChatMessage(data);
	const container = chan.find(".messages");

	if (data.msg.type === "channel_list" || data.msg.type === "ban_list") {
		$(container).empty();
	}

	// Check if date changed
	const prevMsg = $(container.find(".msg")).last();
	const prevMsgTime = new Date(prevMsg.attr("data-time"));
	const msgTime = new Date(msg.attr("data-time"));

	// It's the first message in a channel/query
	if (prevMsg.length === 0) {
		container.append(templates.date_marker({msgDate: msgTime}));
	}

	if (prevMsgTime.toDateString() !== msgTime.toDateString()) {
		prevMsg.after(templates.date_marker({msgDate: msgTime}));
	}

	// Add message to the container
	container
		.append(msg)
		.trigger("msg", [
			target,
			data
		])
		.trigger("keepToBottom");

	var lastVisible = container.find("div:visible").last();
	if (data.msg.self
		|| lastVisible.hasClass("unread-marker")
		|| (lastVisible.hasClass("date-marker")
		&& lastVisible.prev().hasClass("unread-marker"))) {
		container
			.find(".unread-marker")
			.appendTo(container);
	}

	if ((data.msg.type === "message" || data.msg.type === "action") && chan.hasClass("channel")) {
		const nicks = chan.find(".users").data("nicks");
		if (nicks) {
			const find = nicks.indexOf(data.msg.from);
			if (find !== -1) {
				nicks.splice(find, 1);
				nicks.unshift(data.msg.from);
			}
		}
	}
});
