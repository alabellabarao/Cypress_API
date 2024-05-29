/// <reference types="cypress" />


describe('Deletar dispositivo', ()=>{

    it('Deletar um dispositivo inexistente', () => {
          
        const id_inexistente = 'Pedro'
        // validação do DELETE
        cy.request({
            method: 'DELETE',
            url: `/objects/${id_inexistente}`,
            failOnStatusCode: false,
        }).as('deleteDeviceResult') 
    
            //Validações do delete
        cy.get('@deleteDeviceResult')
            .then((response_del) =>  {
                expect(response_del.status).equal(404)
                expect(response_del.body.error)
                        .equal(`Object with id = ${id_inexistente} doesn't exist.`)
            })
        })
 

    it('Deletar um dispositivo existente que não pode deletar', () => {
          
        const id_existente = 7
        // validação do DELETE
        cy.request({
            method: 'DELETE',
            url: `/objects/${id_existente}`,
            failOnStatusCode: false,
        }).as('deleteDeviceResult') 
    
            //Validações do delete
        cy.get('@deleteDeviceResult')
            .then((response_del) =>  {
                expect(response_del.status).equal(405)
                expect(response_del.body.error)
                        .equal(`${id_existente} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)
            })
        })



    it('Deletar um dispositivo', () => {
        const  body ={
            "name": "Novo Apple MacBook Pro 16 da Ana Barão",
            "data": {
               "year": 2024,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
                   "Nova CPU model": "Intel Core i9"
            }
         }
     
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
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
