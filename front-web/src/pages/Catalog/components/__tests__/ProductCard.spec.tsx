import React from 'react';

import { render, screen } from '@testing-library/react';

import ProductCard from '../ProductCard'
import { Product } from '../../../../core/types/Products';



test('should render ProductCard', () => {


    //Arrange
    const product = {
        name: 'computador',
        imgUrl: 'image.jog',
        price: 12
    } as Product;

    //Act
    render(

        <ProductCard product={product} />

    );

    //screen.debug();

    expect(screen.getByText('computador')).toBeInTheDocument();
    expect(screen.getByAltText('computador')).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('12.00')).toBeInTheDocument();

});