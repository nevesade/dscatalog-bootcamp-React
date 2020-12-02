import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '../../../../../core/assets/styles/components/Pagination';
import { ProductsResponse } from '../../../../../core/types/Products';
import { makePrivateRequest, makeRequest } from '../../../../../core/utilis/request';
import Card from '../Card';
import { toast } from 'react-toastify';


const List = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getProducts = useCallback(() => {

        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'

        }
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))

    }, [activePage])


    useEffect(() => {

        getProducts();

    }, [getProducts]);


    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir  este produto?');

        if(confirm){
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
            .then(() => {

                toast.info('Produto removido com sucesso!');
                getProducts();

            })
            .catch(() => {
                toast.error('Erro ao remover produto!');
            })
        }
       

    }

    return (
        <div className="admin-product-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate} >
                Adicionar

            </button>

            <div className="admin-list-container">
                {productsResponse?.content.map(product => (

                    <Card product={product} key={product.id} onRemove={onRemove} />

                ))}

                {productsResponse && (

                    <Pagination
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />

                )}


            </div>


        </div>

    )
}

export default List;