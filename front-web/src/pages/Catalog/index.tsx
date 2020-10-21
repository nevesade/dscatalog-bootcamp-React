import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from '../../core/types/Products';
import { makeRequest } from '../../core/utilis/request';
import ProductCard from './components/ProductCard';
import './styles.scss';



const Catalog = () => {


    

    //quando a lista de produtos estiver disponivel,
    //popular um estado no componente, e listar os produtos dinâmicamente

    const [productsResponse, setProductsResponse ] = useState<ProductsResponse>();
    console.log(productsResponse);
    //quando o componente iniciar, buscar a lista de produots (opção de o fazer via um fetch ou axios(makerequest por exemplo))

    //limitaçoes do fetch
    //muito verboso
    // não tem suporte nativo para ler o progresso de upload de arquivo
    // não te  suporte nativo para enviar query strings
    useEffect(() => {

        const params = {
            page: 0,
            linesPerPage: 12
        }

        makeRequest({ url: '/products', params})
         .then(response =>setProductsResponse(response.data));



    }, []);


    
    return (

        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálgo de produtos
            </h1>
    
            <div className="catalog-products">
                {productsResponse?.content.map( product => (
                    <Link to="/products/1" key={product.id} >
                        <ProductCard />
                    </Link>
                    
                    
                 ) )}
                
               
                
            </div>
        </div>
    );
}

export default Catalog;

