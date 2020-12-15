
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { makePrivateRequest, makeRequest } from '../../../../../core/utilis/request';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { toast } from 'react-toastify';



type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
    imgUrl: string;

}


type ParamsType = {
    productId: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
const Form = () => {

    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';


    useEffect(() => {

        if (isEditing) {

            makeRequest({ url: `/products/${productId}` })
                .then(response => {

                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('category', response.data.category);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);


                    //console.log(response.data);

                })
        }

    }, [productId, isEditing, setValue]);



    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: '',
        imgUrl: ''


    });
    

    const handleOnChange = (event: FormEvent) => {

        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));

    }


    const onSubmit = (data: FormState) => {


        
        const payload = {

            ...formData,

            categories: [{ id: formData.category }]
        }

        


        //console.log(payload);
        makePrivateRequest({
            
            url: isEditing ? `/products/${productId}` :  '/products',
            method: isEditing ? 'PUT' :  'POST',
            data : payload
    
    
    })
           
            .then(() => {

                toast.info('Produto cadastrado com sucesso!');
                history.push('/admin/products');

            })
            .catch(() => {
                toast.error('Erro ao salvar produto!');
            })



    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} >
            <BaseForm title="cadastrar um produto" >


                <div className="row" >
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                value={formData.name}
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: 'o campo deve ter no mínomo 5 caracteres' },
                                    maxLength: { value: 60, message: 'o campo deve ter no máximo 60 caracteres' },
                                })}
                                name="name"
                                type="text"
                                className="form-control mb-5"
                                onChange={handleOnChange}
                                placeholder="Nome do produto"
                                data-testid="name"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}

                        </div>


                        {/*
                            <select 
                        value={formData.category}
                        className="form-control margin-bottom-30 input-base" onChange={handleOnChange}
                        name="category"
                        >
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Electrônicos</option>
                        </select>
                     */}

                        <div className="margin-bottom-30">

                            <input
                                value={formData.price}
                                ref={register({ required: "Campo obrigatório" })}
                                name="price"
                                type="number"
                                className="form-control"
                                onChange={handleOnChange}
                                placeholder="Preço"
                                data-testid="price"

                            />
                            {errors.price && (

                                <div className="invalid-feedback d-block">
                                    {errors.price.message}


                                </div>
                            )}



                        </div>


                        <div className="margin-bottom-30">
                            <input
                                value={formData.imgUrl}
                                ref={register({ required: "Campo obrigatório" })}
                                name="imgUrl"
                                type="text"
                                className="form-control margin-bottom-30 input-base"
                                onChange={handleOnChange}
                                placeholder="Imagem do produto"
                                data-testid="imgUrl"


                            />
                            {errors.imgUrl && (

                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}

                                </div>
                            )}

                        </div>

                    </div>

                    <div className="col-6">
                        <textarea
                            value={formData.description}
                            ref={register({ required: "Campo obrigatório" })}
                            name="description"

                            onChange={handleOnChange}
                            className="form-control"
                            cols={30}
                            rows={10}
                            data-testid="description"

                        />
                        {errors.description && (

                            <div className="invalid-feedback d-block">
                                {errors.description.message}

                            </div>
                        )}

                    </div>

                </div>

            </BaseForm>

        </form>

    )
}
export default Form;