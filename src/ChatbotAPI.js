import axios from "axios";
import { useState } from "react";

async function MoodGuesser(message) {
  try {
    const config = {
      method: "post",
      url: `http://localhost:3000/moodybot?input_mood=${message}`,
      headers: {},
    };

    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    return response.data.reply;
  } catch (error) {
    console.log(error);
    return ""; // or handle the error accordingly
  }
}

const API = {
  GetChatbotResponse: async (message) => {
    return new Promise(function (resolve, reject) {
      setTimeout(async function () {
        if (message === "hi" || message === "hello" || message === "hey") {
          resolve("Here I am, your Moody bot! I can analyze your mood as you write.");
        } else {
          try {
            const moodReply = await MoodGuesser(message);
            resolve(moodReply);
          } catch (error) {
            console.log(error);
            reject(error);
          }
        }
      }, 1000);
    });
  },
};

export default API;
