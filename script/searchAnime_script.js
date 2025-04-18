async function submitTerm() {
  let data;
  try {
    const searchTerm = sessionStorage.getItem("searchTerm");

    data = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm}&page=1`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch API");
      }
      return response.json();
    });
  } catch (error) {
    console.error(error);
    return;
  }
  return data;
}

async function displayAnime() {
  const data = await submitTerm();
  if (!data || !data.data) {
    console.error("Empty search results.");
    return;
  }
  console.log(data);

  //Where to insert the anime cards
  const animeListId = document.getElementById("anime-list");

  //Create a card for each anime
  data.data.forEach((anime) => {
    const animeCardDiv = document.createElement("div");
    animeCardDiv.classList = "item-card";

    const animeImgDiv = document.createElement("img");
    animeImgDiv.classList = "item-card-img";
    animeImgDiv.src = anime.images.jpg.image_url;

    const animeCardTextSectionDiv = document.createElement("div");
    animeCardTextSectionDiv.classList = "item-card-text-section";
    const animeCardHeadTextP = document.createElement("p");
    animeCardHeadTextP.classList = "item-card-h-text";
    animeCardHeadTextP.textContent = anime.title;

    const animeCardContentTextP = document.createElement("p");
    animeCardContentTextP.classList = "item-card-c-text";
    animeCardContentTextP.textContent = anime.synopsis
      ? anime.synopsis.split(" ").slice(0, 50).join(" ") +
        (anime.synopsis.split(" ").length > 50 ? "..." : "")
      : "No synopsis available.";

    animeListId.appendChild(animeCardDiv);
    animeCardDiv.appendChild(animeImgDiv);
    animeCardDiv.appendChild(animeCardTextSectionDiv);
    animeCardTextSectionDiv.appendChild(animeCardHeadTextP);
    animeCardTextSectionDiv.appendChild(animeCardContentTextP);
  });
}

document.addEventListener("DOMContentLoaded", displayAnime());
