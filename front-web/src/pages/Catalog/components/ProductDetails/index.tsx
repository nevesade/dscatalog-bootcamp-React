import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.scss';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg';
import ProductPrice from '../../../../core/assets/styles/components/ProductPrice';
import { makeRequest } from '../../../../core/utilis/request';
import { Product } from '../../../../core/types/Products';  
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';

type ParamsType = {
    productId: string;
}


const ProductDetails = () => {

    const { productId } = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoadind] = useState(false);


    console.log(isLoading);

    useEffect(() => {
        setIsLoadind(true);
        makeRequest({ url: `/products/${productId}` })
            .then(response => setProduct(response.data))
            .finally(() => setIsLoadind(false));

    }, [productId]);

    console.log(productId);

    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <h1>
                    <Link to='/products' className="product-details-goback">
                        <ArrowIcon className="icon-bocak" />
                        <h1 className="text-goback">
                            voltar
                        </h1>
                    </Link>
                    <div className="row">
                        <div className="col-6 pr-5">
                            {isLoading ? <ProductInfoLoader/> : (
                                <>
                                    <div className="product-details-card text-center">
                                        <img src={product?.imgUrl} alt={product?.name} className="product-details-image" />
                                    </div>
                                    <h1 className="product-details-name">
                                        {product?.name}
                                    </h1>
                                    {product?.price && <ProductPrice price={product?.price} />}
                                
                             </>


                            ) }
                        </div>
                        <div className="col-6 product-details-card ">
                            {isLoading ? <ProductDescriptionLoader/> :(
                                <>
                                <h1 className="product-description-title">
                                    Descriçao do Produto
                                </h1>
                                </>




                            ) }
                            

                            <p className="product-description-text">
                                {product?.description}

                            </p>

                        </div>



                    </div>
                </h1>
            </div>
        </div>
    );
};

export default ProductDetails;