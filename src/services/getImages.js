import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "45653966-87357a1b7b4dbce7fb63449bc";

async function getImages(searchQuery, page) {
  const params = {
    q: searchQuery,
    key: API_KEY,
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
    page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data from API");
  }
}

export default getImages;
