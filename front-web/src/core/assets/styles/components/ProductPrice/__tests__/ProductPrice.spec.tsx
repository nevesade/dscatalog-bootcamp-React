import React from 'react';

import {react, render, screen} from '@testing-library/react';

import ProductPrice from '..'

test('should render ProductPrice', () => {

    //Arramge
    //const price = 1200;
    

    //Act

    render(

        <ProductPrice price={1200} />
    );

    //Assert

    //screen.debug()
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('1,200.00');
    
    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();

});


test('should render ProductPrice with price equals zero', () => {

    //Arramge
    //const price = 1200;
    

    //Act

    render(

        <ProductPrice price={0} />
    );

    //Assert

    //screen.debug()
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('0.00');
    
    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();

});


test('should render ProductPrice without thousand separator', () => {

    //Arramge
    //const price = 1200;
    

    //Act

    render(

        <ProductPrice price={100} />
    );

    //Assert

    //screen.debug()
    const currencyElement = screen.getByText('R$');
    const priceElement = screen.getByText('100.00');
    
    expect(currencyElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();

});