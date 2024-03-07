import React, { useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-use-history'
import Message from '../components/Message'
// import Loader from '../components/Loader'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Meta from '../components/Meta'

const CartScreen = ({match}) => {
    const {id} = useParams()
    const productId = id
    const location = useLocation()
    const history = useHistory()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log(qty)
    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart

    useEffect(()=>{
      if(productId){
        dispatch(addToCart(productId, qty))

      }
    }, [dispatch, productId, qty])

    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    }

    const handleQuantityChange=(productId, quantity)=>{
        dispatch(addToCart(productId, quantity))
    }

    const checkoutHandler=()=>{
      history.push('/login?redirect=shipping')
    }

  return (
    <>
    <Meta title='Shopping Cart'/>
    <Row>
      <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length===0?<Message>Your Cart is Empty<Link to="/">Go Back</Link></Message>:(
            <ListGroup variant='flush'>
              {cartItems.map(item=>(
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded  />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                    {`\u20B9 `}{item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control as='select' value={item.qty} onChange={(e)=>handleQuantityChange(item.product, Number(e.target.value))} >
                            {[...Array(item.countInStock).keys()].map(x => (
                            <option key={x+1} value={x+1} >{x+1}</option>
                            ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type='button'  variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item)=> acc+item.qty, 0)}) items</h2>
              {`\u20B9 `}{cartItems.reduce((acc, item)=>acc+item.qty* item.price, 0).toFixed(2)}
            </ListGroup.Item> 
            <ListGroup.Item>
              <Button 
              className='btn-block' 
              type='button' 
              disabled={cartItems.length===0}
              onClick={checkoutHandler}
              >
                Proceed To Checkout 
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default CartScreen
