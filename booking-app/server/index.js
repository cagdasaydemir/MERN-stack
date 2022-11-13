import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// const express = require("express");
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", ()=>{
  console.log("mongodb disconnected")
})
mongoose.connection.on("connected", ()=>{
  console.log("mongodb connected")
})

app.listen(8800, () => {
  connect();
  console.log("Connected to backend!!!!");
});
