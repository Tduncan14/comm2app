import{useState} from 'react';
import{Form,Button, Col} from 'react-bootstrap';
import Checkoutsteps from '../Components/CheckoutSteps';
import FormContainer from '../Components/FormContainer';


const Paymentscreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('Paypal');






    return(
        <FormContainer>
            <Checkoutsteps step1 step2 step3>
                  </Checkoutsteps>
              <h1>Payment Method</h1>
              <Form>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
              <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              id='Paypal'
              name='paymentMethod'
              value = 'Paypal'
              checked
              onChange = {(e) => setPaymentMethod(e.target.value)}>
              </Form.Check>
              </Col>
             </Form.Group>

             <Button type="submit" variant='primary'>
                Continue
             </Button>
    
                </Form>
          

        </FormContainer>
    )
}


export default Payment;