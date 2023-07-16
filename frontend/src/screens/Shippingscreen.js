import {useState}  from 'react';
import {Form,Button} from 'react-bootstrap';
import FormContainer from "../Components/FormContainer";
import Checkoutsteps from '../Components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';

const Shippingscreen = () => {

    const [address,setAddress] = useState('')
    const [city,setCity] = useState('')
    const [postalCode,setPostalCode] = useState('')
    const [ country,setCountry] = useState('')



    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault()

        navigate('/payment')

    }

  return (
    <FormContainer>
        <Checkoutsteps step1 step2 />
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='my-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange ={(e) => setAddress(e.target.value)}>
                
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter city'
                value={address}
                onChange ={(e) => setCity(e.target.value)}>
                
                </Form.Control>
            </Form.Group>


            <Form.Group controlId='postalCode' className='my-2'>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Postal Code'
                value={address}
                onChange ={(e) => setPostalCode(e.target.value)}>
                
                </Form.Control>
            </Form.Group>


            <Form.Group controlId='Country' className='my-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Country'
                value={address}
                onChange ={(e) => setCountry(e.target.value)}>
                
                </Form.Control> 
            </Form.Group>

            
            <Button type="submit" variant='primary'>
                Continue
             </Button>
        </Form>
    </FormContainer>
  )
}

 
export default Shippingscreen
