/* ==========================================
   DASHBOARD CARDS
========================================== */

document
.querySelectorAll(".dashboard-card")
.forEach(function (card) {

    card.addEventListener("click", function (event) {

        const link = card.getAttribute("href");

        // Actual link hai to page open hone do
        if (link && link !== "#") {
            return;
        }

        // # wale cards ko bas kuch nahi karna
        event.preventDefault();

    });

});