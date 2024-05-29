/// <reference types="cypress" />

describe('Alterar dispositivo', () => {

    const body_cadastrar = require('../fixtures/cadastrar_device_sucesso.json')
    const body_put = require('../fixtures/update_device_sucesso.json')

    it('Alterar um dispositivo', () => {
       const dataAtualn =  new Date().toISOString().slice(0, 16)
       
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastrar
        }).as('postDeviceResult') 

        //  pegando o result do  cadastro para pegar o id
        cy.get('@postDeviceResult')
            .then((response_post) =>  {
                expect(response_post.status).equal(200)
                expect(response_post.body.name).equal(body_cadastrar.name)
                expect(response_post.body.createdAt).not.empty
                expect(response_post.body.createdAt.slice(0, 16)).equal(dataAtualn)
                expect(response_post.body.data.year).equal(body_cadastrar.data.year)
                expect(response_post.body.data.price).equal(body_cadastrar.data.price)
                expect(response_post.body.data['CPU model']).equal(body_cadastrar.data['CPU model'])
                expect(response_post.body.data['Hard disk size']).equal(body_cadastrar.data['Hard disk size'])

    // Fazer o put
            cy.request({
                method: 'PUT',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false,
                body: body_put
            }).as('putDeviceResult') 

// Validações do PUT
            cy.get('@putDeviceResult').then((response_put) => {
                expect(response_put.status).equal(200)
                expect(response_put.body.name).equal(body_put.name)
                expect(response_put.body.dataAtualn).equal(body_put.dataAtualn)
                expect(response_put.body.data.year).equal(body_put.data.year)
                expect(response_put.body.data.price).equal(body_put.data.price)
                expect(response_put.body.data['CPU model']).equal(body_put.data['CPU model'])
                expect(response_put.body.data['Hard disk size']).equal(body_put.data['Hard disk size'])
            })
        })
    })
}) 