/// <reference types="cypress" />

describe( 'Buscar um dispositivo específico', ()=>{

    it('Buscar um dispositivo específico', () => {

        const  device_id = '7'
        //tipo derequisição
     
        cy.buscarDeviceEspecifico(device_id)
            .then((response)=>{
                expect(response.status).equal(200)
                expect(response.body.id).equal('7')
                //ou expect(response.body.id).equal(String(7))
                expect(response.body.name).equal('Apple MacBook Pro 16')
                expect(response.body).not.empty
                // expect(response.body.data).not.empty  //esta situação empty é para string
                expect(response.body.data.year).not.string
                expect(response.body.data.year).equal(2019)
                expect(response.body.data.price).not.string
                expect(response.body.data.price).equal(1849.99)
                expect(response.body.data['CPU model']).not.empty
                expect(response.body.data['Hard disk size']).not.empty
                
                //console.log('STATUS CODE: ', response.status)


        })
      
    })


    it('Buscar um dispositivo inexistente', () => {

        const  device_id = 'claus'
        //tipo derequisição
     
        cy.buscarDeviceEspecifico(device_id)
            .then((response)=>{
                expect(response.status).equal(404)
                expect(response.body.error).equal(`Oject with id=${device_id} was not found.`)
               
        })
      
    })

})