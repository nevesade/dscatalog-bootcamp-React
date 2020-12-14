import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ProductsResponse } from '../../core/types/Products';
import { makeRequest } from '../../core/utilis/request';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import './styles.scss';
import Pagination from '../../core/assets/styles/components/Pagination';



const Catalog = () => {


    

    //quando a lista de produtos estiver disponivel,
    //popular um estado no componente, e listar os produtos dinâmicamente

    const [productsResponse, setProductsResponse ] = useState<ProductsResponse>();
   // console.log(productsResponse);
    const [isLoading, setIsLoadind] = useState(false);
    const [activePage, setActivePage] = useState(0);

    //quando o componente iniciar, buscar a lista de produots (opção de o fazer via um fetch ou axios(makerequest por exemplo))

    //limitaçoes do fetch
    //muito verboso
    // não tem suporte nativo para ler o progresso de upload de arquivo
    // não te  suporte nativo para enviar query strings
    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 12
            
        }
        

        //iniciar o loader
        setIsLoadind(true);
        makeRequest({ url: '/products', params})
        .then(response =>setProductsResponse(response.data))
        .finally(() =>  {
            //finalizar o loader
            setIsLoadind(false);
        })


    }, [activePage]);


    
    return (

        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálgo de produtos
            </h1>
    
            <div className="catalog-products">
                {isLoading? < ProductCardLoader /> : (
                    productsResponse?.content.map( product => (
                    <Link to={`/products/${product.id}`} key={product.id} >
                        <ProductCard product = {product} />
                    </Link>
                       
                ) )
                )}
                     
            </div>
            {productsResponse && (
            
            
            <Pagination
                 totalPages={productsResponse.totalPages}
                activePage={activePage}
                onChange= {page => setActivePage(page)}
            />
            
            )}
        </div>
    );
}

export default Catalog;

