import React, {  } from 'react';
import { useForm } from 'react-hook-form';
import { makePrivateRequest } from '../../../../../core/utilis/request';
import BaseForm from '../../BaseForm';
import './styles.scss';



type FormState = {
    name: string;
    price: string;
    //category: string;
    description: string;
    imgUrl: string;

}


const Form = () => {

    const { register, handleSubmit } = useForm<FormState>();
 

    


    const onSubmit = (data: FormState) => {
       

        //console.log(formData);
        makePrivateRequest({ url: '/products', method: 'POST', data });
            

    }


    return (

        <form onSubmit={handleSubmit(onSubmit)} >
            <BaseForm title="cadastrar um produto" >


                <div className="row" >
                    <div className="col-6">
                        <input
                            ref={register({ required: "Campo obrigatório" })}
                            name="name"
                            type="text"
                            className="form-control margin-bottom-30 input-base"
                            
                            placeholder="Nome do produto"


                        />

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



                        <input
                            ref={register({ required: "Campo obrigatório" })}
                            name="price"
                            type="number"
                            className="form-control margin-bottom-30 input-base"
                       
                            placeholder="Preço"

                        />
                        <input
                            ref={register({ required: "Campo obrigatório" })}
                            name="imageUrl"
                            type="text"
                            className="form-control margin-bottom-30 input-base"
                      
                            placeholder="Imagem do produto"


                        />



                    </div>

                    <div className="col-6">
                        <textarea
                            ref={register({ required: "Campo obrigatório" })}
                            name="description"

                         
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10} />

                    </div>

                </div>

            </BaseForm>

        </form>

    )


}
export default Form;