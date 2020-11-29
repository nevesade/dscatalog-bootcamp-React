import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '../../../../../core/assets/styles/components/Pagination';
import { ProductsResponse } from '../../../../../core/types/Products';
import { makeRequest } from '../../../../../core/utilis/request';
import Card from '../Card';


const List = () => {




    //quando a lista de produtos estiver disponivel,
    //popular um estado no componente, e listar os produtos dinâmicamente

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();

    const [isLoading, setIsLoadind] = useState(false);
    const [activePage, setActivePage] = useState(0);

    //quando o componente iniciar, buscar a lista de produots (opção de o fazer via um fetch ou axios(makerequest por exemplo))

    //limitaçoes do fetch
    //muito verboso
    // não tem suporte nativo para ler o progresso de upload de arquivo
    // não te  suporte nativo para enviar query strings

    console.log(productsResponse);
    useEffect(() => {

        const params = {
            page: activePage,
            linesPerPage: 4

        }


        //iniciar o loader
        setIsLoadind(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                //finalizar o loader
                setIsLoadind(false);
            })


    }, [activePage]);


    const history = useHistory();
    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div className="admin-product-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate} >
                Adicionar

            </button>

            <div className="admin-list-container">
                {productsResponse?.content.map(product => (

                    <Card product={product} key={product.id} />

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