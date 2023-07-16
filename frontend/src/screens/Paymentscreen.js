import{useState,useEffect} from 'react';
import{Form,Button, Col} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/CartSlice';
import Checkoutsteps from '../Components/CheckoutSteps';
import FormContainer from '../Components/FormContainer';


const Paymentscreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const cart = useSelector((state) => state.cart) ;
    const {shippingAddress} = cart;



    useEffect(() => {

        if(!shippingAddress){

            navigate('/shipping')

        }
    },[shippingAddress,navigate])


    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')





    }




    return(
        <FormContainer>
            <Checkoutsteps step1 step2 step3>
                  </Checkoutsteps>
              <h1>Payment Method</h1>
              <Form onSubmit={submitHandler}>
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


export default Paymentscreen;