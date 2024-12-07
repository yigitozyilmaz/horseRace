Cypress.on("uncaught:exception", (err, runnable) => {
    // Vue veya benzeri hataları yoksaymak için
    if (err.message.includes("Failed to resolve module specifier")) {
        return false; // Hatayı yoksay ve testlerin çalışmasına devam et
    }
});
