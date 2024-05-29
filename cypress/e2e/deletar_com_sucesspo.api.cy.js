/// <reference types="cypress" />

describe('Deletar dispositivo', ()=>{

    const body_cadastro = require('../fixtures/cadastrar_device_sucesso.json')
    it('Deletar um dispositivo com sucesso', () => {
         
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastro
        }).as('postDeviceResult') 

        //  pegando o result do  cadastro para pegar o id
        cy.get('@postDeviceResult')
            .then((response_post) =>  {
                expect(response_post.status).equal(200)

            // validação do DELETE
            cy.request({
                method: 'DELETE',
                 url: `/objects/${response_post.body.id}`,
                 failOnStatusCode: false,
            }).as('deleteDeviceResult') 
    
            //Validações do delete
            cy.get('@deleteDeviceResult')
                .then((response_del) =>  {
                    expect(response_del.status).equal(200)
                    expect(response_del.body.message)
                        .equal(`Object with id = ${response_post.body.id} has been deleted.`)
            })
        })
    })
})
