import React, { useState } from 'react';
import { makePrivateRequest } from '../../../../../core/utilis/request';
import BaseForm from '../../BaseForm';
import './styles.scss';



type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;

}

type  FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
const Form = () => {

    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: ''

    });
 

    const handleOnChange = (event: FormEvent ) => {

        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));

    }

    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const payload = {

            ...formData,
            imgUrl: 'https://static.thenounproject.com/png/195040-200.png',
            categories: [{id:formData.category} ]
        }
        

        //console.log(payload);
        makePrivateRequest({ url: '/products', method: 'POST', data: payload})
        .then(() => {
                setFormData({name: '', category: '', price: '',description: ''});
        });

    }


    return (

        <form onSubmit={handleSubmit} >
            <BaseForm title="cadastrar um produto" >


                <div className="row" >
                    <div className="col-6">
                        <input
                           value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"


                        />


                        <select 
                        value={formData.category}
                        className="form-control mb-5" onChange={handleOnChange}
                        name="category"
                        >

                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Electrônicos</option>

                        </select>


                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"

                        />



                    </div>

                    <div className="col-6">
                        <textarea 
                        name="description" 
                        value={formData.description}
                        onChange={handleOnChange}
                        className="form-control"
                        cols={30} 
                        rows={10}/>

                    </div>

                </div>

            </BaseForm>

        </form>

    )

}

export default Form;