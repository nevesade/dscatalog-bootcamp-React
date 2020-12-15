import React from 'react';

import { getByLabelText, render, screen, waitFor } from '@testing-library/react';

import Form from '..'
import { Router, useParams } from 'react-router-dom';
import history from '../../../../../core/utilis/history';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { categoriesResponse } from './fixtures';
import selectEvent from 'react-select-event'
import { ToastContainer } from 'react-toastify';


jest.mock('react-router-dom', () => ({


    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        productId: 'create'
    })
}))



const server = setupServer(
    rest.get('http://localhost:8080/categories', (req, res, ctx) => {
        return res(ctx.json(categoriesResponse))
    }),


    rest.post('http://localhost:8080/products', (req, res, ctx) => {
        return res(ctx.status(201));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render Form', async () => {



    render(
        <Router history={history}>
            <Form />

            <ToastContainer />
        </Router>
    );


    const submitButton = screen.getByRole('button', { name: /salvar/i });
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlnput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('categories');


    userEvent.type(nameInput, 'Computador');

    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos'])
    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlnput, 'image.JPG');
    userEvent.type(descriptionInput, 'NICE PC ');
    userEvent.click(submitButton);

    await waitFor(() =>  expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
    
    expect(history.location.pathname).toBe('/admin/products');
    expect(screen.getByText(/cadastrar um produto/i)).toBeInTheDocument();

});



test.only('should render Form', async () => {



    render(
        <Router history={history}>
            <Form />

        </Router>
    );


    const submitButton =  screen.getByRole('button', {name: /salvar/i });
    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getAllByText('Capo obrigatório')).toHaveLength(5));
 


        const nameInput = screen.getByTestId('name');
        const priceInput = screen.getByTestId('price');
        const imgUrlnput = screen.getByTestId('imgUrl');
        const descriptionInput = screen.getByTestId('description');
        const categoriesInput = screen.getByLabelText('categories');
    
    
        userEvent.type(nameInput, 'Computador');
    
        await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos'])
        userEvent.type(priceInput, '5000');
        userEvent.type(imgUrlnput, 'image.JPG');
        userEvent.type(descriptionInput, 'NICE PC ');
    

});
