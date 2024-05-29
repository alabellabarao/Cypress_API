/// <reference types="cypress" />

describe( 'Buscar um dispositivo específico', ()=>{

    it('Buscar um dispositivo específico', () => {

        const  device_id = '10'
        //tipo derequisição
        cy.request({
            //tipo de método (get, post)
            method:'GET',

            // pegar a url no insomnia
            url: `/objects/${device_id}`,

            failOnStatusCode:false

        }).as('getDeviceResult')
        cy.get('@getDeviceResult')
            .then((response)=>{
                expect(response.status).equal(200)
                expect(response.body.id).equal('10')
                //ou expect(response.body.id).equal(String(10))
                expect(response.body.name).equal('Apple iPad Mini 5th Gen')
                expect(response.body).not.empty
                // expect(response.body.data).not.empty  //esta situação empty é para string
                expect(response.body.data.Capacity).not.empty
                expect(response.body.data.Capacity).equal('64 GB')
                expect(response.body.data['Screen size']).not.string
                expect(response.body.data['Screen size']).equal(7.9)
                
  

        })
      
    })

})