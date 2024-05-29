/// <reference types="cypress" />


describe('Cadastro de dispositivo', ()=>{

    const payload_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json')
   it('Cadastrar um dispositivo sem mandar dados', () => {
 
        cy.cadastrarDevice()
            .then((response) => {
                expect(response.status).equal(400)
                expect(response.body.error)
                    .equal("400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.")
                             
                })

    })

    it('Cadastrar um dispositivo', () => {
        const dataAtual =  new Date().toISOString().slice(0, 16)

            cy.cadastrarDevice(payload_cadastro_device)
                .then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body.id).not.empty
                    expect(response.body.createdAt).not.empty
                    expect(response.body.createdAt.slice(0, 16)).equal(dataAtual)
                    expect(response.body.name).not.empty
                    expect(response.body.name).equal('Novo Apple MacBook Pro 16 da Ana Barão')
                    expect(response.body.data.year).equal(2024)
                    expect(response.body.data['Hard disk size']).not.empty
                    expect(response.body.data['Hard disk size']).equal('1 TB')
                    expect(response.body.data['Nova CPU model']).equal('Intel Core i9')
                    //console.log(response.body.createdAt.slice(0, 10))
                    //console.log(new Date().toISOString().slice(0, 10))
                    
                })
          
    })

})