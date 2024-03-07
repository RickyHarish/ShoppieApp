import React, {useState} from 'react'
// import {Link, useLocation} from 'react-router-dom'
import { useHistory } from 'react-router-use-history'
import { Form, Button, Col, Row } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'

const PaymentScreen = () => {
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    const dispatch = useDispatch()
    const history = useHistory()

    if(!shippingAddress){
        history.push('/shipping')
    }

    const submitHandler=(e)=>{
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

  return (
    <FormContainer>
      <Meta title='Payment Method' />
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label as='legend'>
                Select Method
        </Form.Label>
      
      <Col>
      <Row>
        <Form.Check 
        className='m-3'
        type='radio' 
        label="PayPal or Credit Card" 
        id='PayPal' 
        name='paymentMethod' 
        value="PayPal" 
        checked 
        onChange={(e)=> setPaymentMethod(e.target.value)}
        >   
        </Form.Check>
        </Row>
        <Row>
        {/* <Form.Check 
        className='m-3'
        type='radio' 
        label="Stripe" 
        id='Stripe' 
        name='paymentMethod' 
        value="Stripe"  
        onChange={(e)=> setPaymentMethod(e.target.value)}
        >   
        </Form.Check> */}
        </Row>
      </Col>
      </Form.Group>
        <Button type='submit' variant='dark'>
            Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
