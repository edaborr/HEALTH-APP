const API_KEY = "9aab7c515405183beec07a2d05206dbc";

export const getMedicalNews = async () => {
  try {

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=health&lang=en&max=10&apikey=${API_KEY}`
    );

    const data = await response.json();
    console.log(data);

    return data.articles || [];

  } catch (error) {

    console.error("Haber çekme hatası:", error);

    return [];
  }
};