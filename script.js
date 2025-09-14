document.addEventListener("DOMContentLoaded", () => {
  const charactersList = document.getElementById("characters-list");
  const animalName = document.getElementById("character-name");
  const animalImage = document.getElementById("character-image");
  const animalVotes = document.getElementById("character-votes");
  const voteBtn = document.getElementById("vote-button");
  const resetBtn = document.getElementById("reset-button");

  let currentCharacter = null;

  fetch("http://localhost:3000/characters")
    .then(res => res.json())
    .then(characters => {
      characters.forEach((character, index) => {
        const li = document.createElement("li");
        li.textContent = character.name;

        li.addEventListener("click", () => {
          showCharacterDetails(character);
        });

        charactersList.appendChild(li);

        
        if (index === 0) {
          showCharacterDetails(character);
        }
      });
    })
    .catch(err => console.error("Error fetching characters:", err));

  
   function showCharacterDetails(character) {
    currentCharacter = { ...character };
    animalName.textContent = character.name;
    animalImage.src = character.image;
    animalVotes.textContent = character.votes;
  }

  voteBtn.addEventListener("click", () => {
    if (currentCharacter) {
      currentCharacter.votes += 1;
      animalVotes.textContent = currentCharacter.votes;
    }
  });

  resetBtn.addEventListener("click", () => {
    if (currentCharacter) {
      currentCharacter.votes = 0;
      animalVotes.textContent = 0;
    }
  });
});
