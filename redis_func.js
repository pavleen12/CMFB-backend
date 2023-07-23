const express = require("express");
const router = express.Router();
const axios = require("axios");
const ioredis_client = require("./index");

const upstashURL = "https://usw2-sacred-caribou-30494.upstash.io";
const apiKey =
  "AnceACQgZmM2NmEyZTctMGI3ZS00YWQ2LTk3ZjYtYmI5NjJlYzRkN2EwqlhHQr1j6hOcXxOrSp6RA1s5XfXy7m71JxCnSKaL2Bo=";

class Redis {
  getRedisData = async (key) => {
    return await axios
      .get(`${upstashURL}/get/${key}`, {
        headers: {
          Authorization:
            "Bearer AnceACQgZmM2NmEyZTctMGI3ZS00YWQ2LTk3ZjYtYmI5NjJlYzRkN2EwqlhHQr1j6hOcXxOrSp6RA1s5XfXy7m71JxCnSKaL2Bo=",
        },
      })
      .then((response) => 
      {
        return response.data
    })
  };

  setRedisData = (key, data) => {
    // return
    axios
      .get(`${upstashURL}/set/${key}/${data}`, {
        headers: {
          Authorization:
            "Bearer AXceACQgZmM2NmEyZTctMGI3ZS00YWQ2LTk3ZjYtYmI5NjJlYzRkN2EwNDBlOWExM2UzZWRjNGJhYjg5YWQwYTA5ZmE0MWU1MjQ=",
        },
      })
      .then((response) => 
      {
        
        return response.data
    })
      .then((data) => {
        return data;
      });
  };
}

module.exports = Redis;
