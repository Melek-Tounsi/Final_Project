import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCart } from 'react-use-cart';

export default function ItemsCard (props){

    const { addItem } = useCart();

  
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.img} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.price} DT
                    </Card.Text>
                    <Button onClick={() =>addItem(props.item)} variant="primary">Add to shoppingCart</Button>
                </Card.Body>
            </Card>
        </div>
    );
}