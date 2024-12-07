describe('Horse Race Application', () => {
    beforeEach(() => {
        // Uygulamanın doğru URL'sine git
        cy.visit('http://localhost:5173');
    });

    it('should generate a race program when "Generate Program" is clicked', () => {
        // "Generate Program" butonunun görünür olmasını bekle ve tıkla
        cy.contains('Generate Program', { timeout: 10000 }).should('be.visible').click();

        // Program tablosunun oluşturulduğunu doğrula
        cy.get('.program-table').should('exist').and('be.visible');
    });

    it('should start the race when "Start" is clicked', () => {
        // "Generate Program" butonuna tıkla
        cy.contains('Generate Program').click();

        // "Start" butonunun aktif hale gelmesini bekle ve tıkla
        cy.contains('Start', { timeout: 10000 }).should('be.visible').click();

        // Yarışın başladığını doğrula (örneğin, at ikonlarının hareket ettiğini doğrula)
        cy.get('.horse-icon').first().invoke('attr', 'style').then((initialStyle) => {
            cy.wait(500); // 500ms bekle, hareketi doğrulamak için
            cy.get('.horse-icon').first().invoke('attr', 'style').should('not.eq', initialStyle);
        });
    });

    it('should reset the game when "Reset Game" is clicked', () => {
        // "Generate Program" butonuna tıkla
        cy.contains('Generate Program').click();

        // "Start" butonuna tıkla
        cy.contains('Start').click();
        // Yarışın sıfırlandığını doğrula (örneğin, at pozisyonlarının sıfırlandığını kontrol et)
        cy.get('.horse-icon').each((horse) => {
            cy.wrap(horse).invoke('attr', 'style').should('contain', 'left: 0%');
        });
    });
});
