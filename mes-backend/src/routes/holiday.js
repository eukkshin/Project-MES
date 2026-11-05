const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { year, month } = req.query;

    const params = new URLSearchParams({
      ServiceKey: process.env.HOLIDAY_API_KEY,
      solYear: String(year),
      solMonth: String(month).padStart(2, "0"),
      _type: "json",
      numOfRows: "50",
    });

    const url =
      `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?${params}`;

    const response = await fetch(url);
    const data = await response.json();

    const body = data.response?.body;
    const items = body?.items?.item;

    const holidays = !items
      ? []
      : Array.isArray(items)
        ? items
        : [items];

    res.json({
      success: true,
      holidays,
    });
  } catch (error) {
    console.error("공휴일 조회 오류:", error);
    res.status(500).json({
      success: false,
      message: "공휴일 정보를 불러오지 못했습니다.",
    });
  }
});

module.exports = router;