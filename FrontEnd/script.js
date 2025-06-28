document.addEventListener("DOMContentLoaded", function () {
    const continueMoodBtn = document.getElementById("continueMoodBtn");
    const moodButtons = document.querySelectorAll(".mood-btn");

    // Page 1 logic - Mood selection
    if (continueMoodBtn && moodButtons.length > 0) {
        let selectedMood = "";

        moodButtons.forEach(button => {
            button.addEventListener("click", () => {
                moodButtons.forEach(btn => btn.classList.remove("selected"));
                button.classList.add("selected");
                selectedMood = button.getAttribute("data-mood");
                continueMoodBtn.disabled = false;
            });
        });

        continueMoodBtn.addEventListener("click", () => {
            if (selectedMood) {
                window.location.href = `page2.html?mood=${encodeURIComponent(selectedMood)}`;
            }
        });
    }

    // Page 2 logic - Ingredients and allergies
    const continueIngredientsBtn = document.getElementById("continueIngredientsBtn");
    const ingredientInput = document.getElementById("ingredients-input");
    const allergyButtons = document.querySelectorAll(".allergy-btn");
    const otherAllergyInput = document.getElementById("other-allergy-input");

    if (continueIngredientsBtn && ingredientInput) {
        const validateInputs = () => {
            const hasIngredients = ingredientInput.value.trim().length > 0;
            continueIngredientsBtn.disabled = !hasIngredients;
        };

        ingredientInput.addEventListener("input", validateInputs);

        allergyButtons.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("selected");
                if (button.classList.contains("other-btn")) {
                    const isSelected = button.classList.contains("selected");
                    otherAllergyInput.style.display = isSelected ? "block" : "none";
                }
            });
        });

        continueIngredientsBtn.addEventListener("click", () => {
            const ingredients = ingredientInput.value.trim();
            const selectedAllergies = Array.from(allergyButtons)
                .filter(btn => btn.classList.contains("selected"))
                .map(btn => btn.getAttribute("data-allergy"));

            if (document.querySelector(".other-btn").classList.contains("selected")) {
                const customAllergy = otherAllergyInput.value.trim();
                if (customAllergy) selectedAllergies.push(customAllergy);
            }

            const moodParam = new URLSearchParams(window.location.search).get("mood");
            const allergyParam = selectedAllergies.join(",");
            window.location.href = `page3.html?mood=${encodeURIComponent(moodParam)}&ingredients=${encodeURIComponent(ingredients)}&allergies=${encodeURIComponent(allergyParam)}`;
        });

        validateInputs();
    }

    // Page 3 logic - Health goal
    const continueGoalBtn = document.getElementById("continueGoalBtn");
    const goalButtons = document.querySelectorAll(".goal-btn");

    if (continueGoalBtn && goalButtons.length > 0) {
        let selectedGoal = "";

        goalButtons.forEach(button => {
            button.addEventListener("click", () => {
                goalButtons.forEach(btn => btn.classList.remove("selected"));
                button.classList.add("selected");
                selectedGoal = button.getAttribute("data-goal");
                continueGoalBtn.disabled = false;
            });
        });

        continueGoalBtn.addEventListener("click", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const mood = urlParams.get("mood");
            const ingredients = urlParams.get("ingredients");
            const allergies = urlParams.get("allergies");
            const goal = selectedGoal;

            window.location.href = `page4.html?mood=${encodeURIComponent(mood)}&ingredients=${encodeURIComponent(ingredients)}&allergies=${encodeURIComponent(allergies)}&goal=${encodeURIComponent(goal)}`;
        });
    }
});


function goBackToMealPlan() {
    window.location.href = "page4.html";
}

function viewRecipe(meal) {
    window.location.href = `page5.html?meal=${encodeURIComponent(meal)}`;
}
