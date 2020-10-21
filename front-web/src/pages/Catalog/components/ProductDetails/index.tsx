import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.scss';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/arrow.svg';

type ParamsType = {
    productId: string;
}

const ProductDetails = () =>{

    const { productId } = useParams<ParamsType>();
    
    console.log(productId);

    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <h1>
                  <Link to='/products' className="product-details-goback">
                    <ArrowIcon className="icon-bocak"/>
                        <h1 className="text-goback">
                            voltar
                        </h1>  
                  </Link>
                </h1>
            </div>    
        </div>
    );
};

export default ProductDetails;