describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit("./src/index.html")

  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longtext = Cypress._.repeat('abdefghijklmnopqrstuvwyxz', 10)

    cy.get('#firstName').type('Deivson')
    cy.get('#lastName').type('Sena')
    cy.get('#email').type('dsena@gmail.com')
    cy.get('#open-text-area').type(longtext, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Dinho')
    cy.get('#lastName').type('Sena')
    cy.get('#email').type('fsmglGMllgl@gmail,com')
    cy.get('#open-text-area').type('Deivson Lindo', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('validar que, se um valor não-numérico para digitado, seu valor continuará vazio.', () => {
    cy.get('#phone')
      .type('ttyyggffer')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    // Arrange: configuração do cenário
    cy.get('#firstName').type('Dinho')
    cy.get('#lastName').type('Sena')
    cy.get('#email').type('dsena@gmail.com')
    cy.get('#open-text-area').type('telefone obrigatorio')

    //Act: execução da ação
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    // assert: Verificação do resultado
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Deivson')
      .should('have.value', 'Deivson')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Sena')
      .should('have.value', 'Sena')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('dsena@gmail.com')
      .should('have.value', 'dsena@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('998756430')
      .should('have.value', '998756430')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
  })
  it('envia o formuário com sucesso usando um comando customizado.1', () => {
    const data = {
      firstName: 'Deivson',
      lastName: 'Sena Santos',
      email: 'dsena@gmail.com',
      text: 'teste'
    }
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')


  })
  it('envia o formuário com sucesso usando um comando customizado.2', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')


  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(($tipo_atendimento) => {
        cy.wrap($tipo_atendimento)
          .check()
          .should('be.checked')
      })

  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    // seleciona e cria um alias para os checkboxes
    cy.get('input[type="checkbox"]')//.as('checkboxes')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
    
    // marca todos
    //cy.get('@checkboxes').check()

    //verifica que há 2 checkboxes
   // cy.get('@checkboxes').should('have.length', 2) 
    
    // verifica que todos estão marcados
    // "each" = percorre todos os elementos encontrados
    //  cy.get('@checkboxes').each(($checkbox) => {
    
    //transforma o elemento nativo do DOM/jQuery ($checkbox)
    // em um objeto do Cypress, permitindo usar comandos do Cypress nele
    //  cy.wrap($checkbox).should('be.checked')

   })
    // desmarca o último
  //  cy.get('@checkboxes')
    //  .last()
    //  .uncheck()
    
    // verificações finais
   // cy.get('@checkboxes')
    // .first()
    // .should('be.checked')
    
    //cy.get('@checkboxes')
     // .last()
      //.should('not.be.checked')
    
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload') //pega o input de upload
      .selectFile('cypress/fixtures/example.json') //simula selecionar o arquivo "example.json"
      .should(input => { //faz uma asserção automática com should()
        expect(input[0].files[0].name).to.equal('example.json') //   valida que o nome do arquivo é o esperado

      })
  
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload') //pega o input de upload
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //simula selecionar o arquivo "example.json"
      .should(input => { //faz uma asserção automática com should()
        expect(input[0].files[0].name).to.equal('example.json') //   valida que o nome do arquivo é o esperado

      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('samplefile')
    cy.get('#file-upload') //pega o input de upload
      .selectFile('@samplefile') //simula selecionar o arquivo "example.json"
      .should(input => { //faz uma asserção automática com should()
        expect(input[0].files[0].name).to.equal('example.json') //valida que o nome do arquivo é o esperado
      
      })
 
  })
  
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //cy.get('a[href="privacy.html"]')  
    cy.contains('a', 'Política de Privacidade')  
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  
    cy.get('a[href="privacy.html"')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
  
    it('simulando um dispositivo com 410 pixels de largura e 860 pixels de altura', () => {
        
    })

})  
  