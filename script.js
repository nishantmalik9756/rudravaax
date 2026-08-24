document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("partnershipForm");

    const formSection =
        document.getElementById("partnershipFormSection");

    const success =
        document.getElementById("requestSuccess");

    const instagram =
        document.getElementById("instagram");

    const successInstagram =
        document.getElementById("successInstagram");

    const requestAgain =
        document.getElementById("requestAgain");

    const doneButton =
        document.getElementById("doneButton");

    const finalPopup =
        document.getElementById("finalPopup");

    const popupDone =
        document.getElementById("popupDone");


    /* =========================
       SUBMIT + EMAIL
    ========================= */

    if (form) {

        form.addEventListener("submit", async function (event) {

            event.preventDefault();


            const submitButton =
                form.querySelector(".partnership-submit");


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending...";

            }


            try {

                const response = await fetch(
                    "https://formspree.io/f/xjybdzyy",
                    {
                        method: "POST",

                        body: new FormData(form),

                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (!response.ok) {

                    throw new Error(
                        "Form submission failed"
                    );

                }


                /* Instagram ID */

                if (
                    instagram &&
                    successInstagram
                ) {

                    successInstagram.value =
                        instagram.value;

                }


                /* Show success screen */

                if (formSection) {

                    formSection.style.display =
                        "none";

                }


                if (success) {

                    success.style.display =
                        "block";

                }


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });


            } catch (error) {

                console.error(error);

                alert(
                    "Your request could not be sent. Please try again."
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML = `
                        <span>
                            Send Partnership Request
                        </span>

                        <span class="submit-arrow">
                            →
                        </span>
                    `;

                }

            }

        });

    }


    /* =========================
       REQUEST AGAIN
    ========================= */

    if (requestAgain) {

        requestAgain.addEventListener(
            "click",
            function () {

                if (form) {

                    form.reset();

                }


                if (success) {

                    success.style.display =
                        "none";

                }


                if (formSection) {

                    formSection.style.display =
                        "block";

                }


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =========================
       DONE
    ========================= */

    if (doneButton) {

        doneButton.addEventListener(
            "click",
            function () {

                if (finalPopup) {

                    finalPopup.style.display =
                        "flex";

                }

            }
        );

    }


    /* =========================
       FINAL CONTINUE
    ========================= */

    if (popupDone) {

        popupDone.addEventListener(
            "click",
            function () {

                window.location.href =
                    "index.html";

            }
        );

    }

});